import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import * as gtag from '../lib/gtag'
import 'bootstrap/dist/css/bootstrap.min.css'
import '../styles/globals.scss'
// Slick carousel styles (requires installing `react-slick` and `slick-carousel`)
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const App = ({ Component, pageProps }) => {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url, { shallow } = {}) => {
      if (!shallow) gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  // Load Bootstrap JS on client only
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle')
      .then(() => {
        // bootstrap loaded
      })
      .catch((err) => {
        console.error('Failed to load Bootstrap JS', err)
      })
  }, [])

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </>
  )
}

export default App
