import type { NextPage } from 'next'
import Head from 'next/head'
import Header from '../components/header'
import Products from '../components/products'

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Enliven</title>
        <meta
          name="description"
          content="Rent plants for your next event with enliven"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <Products />
    </div>
  )
}

export default Home
