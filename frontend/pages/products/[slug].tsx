import Head from 'next/head'
import Image from 'next/image'
import React from 'react'
import Header from '../../components/header'
import products from '../../products.json'
import { fromImageToUrl } from '../../utils/urls'

const product = products[0]

const ProductPage = () => (
  <div>
    <Head>
      {product.meta_title && <title>Enliven - {product.meta_title}</title>}
      {product.meta_description && (
        <meta name="description" content={product.meta_description} />
      )}
    </Head>
    <Header />

    <div className="container flex flex-col-reverse height-80 sm:height-full sm:flex-row gap-8">
      <div className="flex-1 w-8/12">
        <div className="py-8">
          <div className="flex justify-between">
            <h3 className="mb-4 text-lg font-light">{product.name}</h3>
            <div className="text-gray-500 text-xl">€{product.price}</div>
          </div>
          <p className="text-gray-500 text-sm">{product.content}</p>
          <button className="text-green-500 bg-white transition-colors rounded-md px-8 py-2 my-16 text-sm hover:bg-green-100 hover:text-green-500 border border-green-500">
            Add to cart
          </button>
        </div>
      </div>
      <div className="flex-1">
        <img src={fromImageToUrl(product.image)} alt={product.name} />
      </div>
    </div>
  </div>
)

export default ProductPage
