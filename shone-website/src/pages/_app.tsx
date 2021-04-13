// import 'tailwindcss/tailwind.css'
import './_app.css'

import { ApolloProvider } from '@apollo/client'
import React, { useEffect } from 'react'

import createClient from '../apollo-client'

function MyApp({ Component, pageProps }: any): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return (
    <ApolloProvider client={createClient()}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
