import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import Header from '../components/header'
import Footer from '../components/footer'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Provider>
    </>
  )
}
export default MyApp
