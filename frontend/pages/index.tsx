import type { NextPage } from 'next'
import Head from 'next/head'
import Filter from '../components/filter'
import { API_URL } from '../utils/urls'

const Home: NextPage<{ products: any[] }> = ({ products }) => {
  return (
    <div>
      <Head>
        <title>Frond</title>
        <meta
          name="description"
          content="Rent plants for your next event with Frond"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Filter products={products} />
    </div>
  )
}

export async function getStaticProps() {
  const productsRes = await fetch(`${API_URL}/products`)
  const products = await productsRes.json()
  return {
    props: {
      products,
    },
  }
}

export default Home
