import Head from 'next/head'
import React from 'react'
import Image from 'next/image'
import BuyButton from '../../components/buyButton'
import { API_URL, fromImageToUrl } from '../../utils/urls'

const ProductPage = ({ product }: { product: any }) => (
  <div className="bg-gray-100">
    <Head>
      {product.meta_title && <title>Frond - {product.meta_title}</title>}
      {product.meta_description && (
        <meta name="description" content={product.meta_description} />
      )}
    </Head>

    <div className="bg-gray-100 py-16">
      <div className="container">
        <div className=" bg-white rounded-lg overflow-hidden flex flex-col-reverse height-80 sm:height-full sm:flex-row">
          {/* content */}
          <div className="flex-1 w-full sm:w-8/12">
            {/* header */}
            <div className="flex items-center justify-between border-b bg-gray-50 py-8 px-16">
              <h3 className="text-4xl font-extrabold text-gray-900">
                {product.name}
              </h3>
              <div className="text-gray-500 text-2xl">
                €{product.price.toFixed(2)}
              </div>
            </div>
            <div className="p-16">
              <div className=" mb-24">
                {product.description
                  .split('\n\n')
                  .map((paragraph: string, i: number) => (
                    <p key={i} className="text-gray-500 text-sm mb-4">
                      {paragraph}
                    </p>
                  ))}
              </div>
              <BuyButton product={product} />
            </div>
          </div>
          {/* image */}
          <div style={{ height: 500 }}>
            <img
              src={fromImageToUrl(product.image)}
              alt={product.name}
              className="h-full"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
)

export async function getStaticPaths() {
  const productsRes = await fetch(`${API_URL}/products`)
  const products = await productsRes?.json()

  return {
    paths: products.map((product: any) => ({
      params: { slug: product.slug },
    })),
    // show 404 if param is not found
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { slug } = params
  const productRes = await fetch(`${API_URL}/products/?slug=${slug}`)
  const product = await productRes?.json()

  return {
    props: {
      product: product[0],
    },
  }
}

export default ProductPage
