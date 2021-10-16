import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/header'

import products from '../products.json'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Enliven</title>
        <meta
          name="description"
          content="Rent plants for your next event with enliven"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />

      {/* product section */}
      <main className="bg-gray-100 py-16">
        <div className="container">
          {products.map(product => (
            <div key={product.id}>
              <img src="" />
              {product.name}
              {product.price}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default Home
