import 'tailwindcss/tailwind.css'
import App, { AppInitialProps } from 'next/app'
import Cookies from 'universal-cookie'
import React from 'react'
import consts from '../components/consts'
import { BasePageProps } from '../BasePageProps'
function MyApp({ Component, pageProps }: any): JSX.Element {
  return <Component {...pageProps} />
}

MyApp.getInitialProps = async (
  appContext,
): Promise<AppInitialProps & BasePageProps> => {
  const appProps = await App.getInitialProps(appContext)
  const cookies = new Cookies(appContext.ctx.req?.headers.cookie)
  const password = cookies.get(consts.SiteReadCookie) ?? ''
  if (password === 'letmein') {
    appProps.pageProps.hasReadPermission = true
  }
  return { ...appProps }
}

export default MyApp
