// import 'tailwindcss/tailwind.css'
import './index.css'

import React, { useEffect } from 'react'

function MyApp({ Component, pageProps }: any): JSX.Element {
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
