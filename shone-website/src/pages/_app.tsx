import 'tailwindcss/tailwind.css'

import React from 'react'

function MyApp({ Component, pageProps }: any): JSX.Element {
  return <Component {...pageProps} />
}

export default MyApp
