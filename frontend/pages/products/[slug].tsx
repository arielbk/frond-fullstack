import Head from 'next/head'
import React from 'react'
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

    <div className="container flex flex-col-reverse height-80 sm:height-full sm:flex-row gap-8">
      <div className="flex-1 w-8/12">
        <div className="py-8">
          <div className="flex justify-between">
            <h3 className="mb-4 text-lg font-light">{product.name}</h3>
            <div className="text-gray-500 text-xl">€{product.price}</div>
          </div>
          <p className="text-gray-500 text-sm">{product.content}</p>
          <BuyButton product={product} />
        </div>
      </div>
      <div className="flex-1">
        <img src={fromImageToUrl(product.image)} alt={product.name} />
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
  console.log(slug)
  const productRes = await fetch(`${API_URL}/products/?slug=${slug}`)
  const product = await productRes?.json()

  return {
    props: {
      product: product[0],
    },
  }
}

export default ProductPage
