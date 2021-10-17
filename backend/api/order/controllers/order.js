"use strict";
const { sanitizeEntity } = require("strapi-utils");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * Return amount of cents from a decimal price
 * @param {number} number
 */
const fromDecimalToCents = (number) => parseInt(number * 100);

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  /**
   * only returns orders that belong to the authenticated user
   * @param {any} ctx
   */
  async find(ctx) {
    const { user } = ctx.state;
    let entities;
    if (ctx.query._q) {
      entities = await strapi.services.order.search({
        ...ctx.query,
        user: user.id,
      });
    } else {
      entities = await strapi.services.order.find({
        ...ctx.query,
        user: user.id,
      });
    }

    return entities.map((entity) =>
      sanitizeEntity(entity, { model: strapi.models.order })
    );
  },

  /**
   * returns specific order if it belongs to the authenticated user - else 404
   * @param {any} ctx
   */
  async findOne(ctx) {
    const { id } = ctx.params;
    const { user } = ctx.state;

    const entity = await strapi.services.order.findOne({ id, user: user.id });
    return sanitizeEntity(entity, { model: strapi.models.order });
  },

  /**
   * creates a new order and sets up stripe checkout session for FE
   * @param {ny} ctx
   */
  async create(ctx) {
    const { product } = ctx.request.body;
    const { user } = ctx.state;

    if (!product) return ctx.throw(400, "A product must exist on the request");
    // check if the product exists on backend
    const realProduct = await strapi.services.product.findOne({
      id: product.id,
    });
    if (!realProduct) return ctx.throw(400, "The product does not exist");

    // this is where we will redirect
    const BASE_URL = ctx.request.header.origin || "http://localhost:300";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      customer_email: user.email,
      mode: "payment",
      success_url: `${BASE_URL}/order/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: BASE_URL,
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: realProduct.name,
            },
            unit_amount: fromDecimalToCents(realProduct.price),
          },
          quantity: 1,
        },
      ],
    });

    // create the order
    await strapi.services.order.create({
      user: user.id,
      product: realProduct.id,
      total: realProduct.price,
      status: "UNPAID",
      checkout_session: session.id,
    });

    return { id: session.id };
  },

  /**
   * verifies payment and updates order status
   * @param {any} ctx
   */
  async confirm(ctx) {
    const { checkout_session } = ctx.request.body;

    // make sure we have the real data from stripe
    const session = await stripe.checkout.sessions.retrieve(checkout_session);

    if (session.payment_status === "paid") {
      const updatedOrder = await strapi.services.order.update(
        {
          checkout_session,
        },
        { status: "PAID" }
      );
      return sanitizeEntity(updatedOrder, { model: strapi.models.order });
    } else {
      ctx.throw(400, "Payment was not successful");
    }
  },
};
