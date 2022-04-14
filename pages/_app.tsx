import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
      <meta name="viewport" content="width=device-width"/>
    </Head>
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
    </>
  )
}

export default MyApp
