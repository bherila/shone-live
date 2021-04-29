// import 'tailwindcss/tailwind.css'
import './_app.css'

import { ApolloProvider } from '@apollo/client'
import React, { useEffect } from 'react'

import createClient from '../apollo-client'
import Layout from '../components/Layout'

function MyApp({ Component, pageProps, router }: any): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={createClient()}>
      <Layout router={router} />
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
