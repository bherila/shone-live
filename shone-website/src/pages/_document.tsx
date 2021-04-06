import { ServerStyleSheets } from '@material-ui/core/styles'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import React from 'react'
// import theme from '../src/theme';

const preloadFont = (url: string[]) =>
  url.map((font) => (
    <link key={font} rel="preload" href={font} crossOrigin="anonymous" />
  ))

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {preloadFont([
            '/font/FuturaBT-Heavy.woff',
            '/font/FuturaBT-Heavy.woff2',
            '/font/FuturaBT-Light.woff',
            '/font/FuturaBT-Light.woff2',
            '/font/FuturaBT-Medium.woff',
            '/font/FuturaBT-Medium.woff2',
          ])}
          <link rel="stylesheet" href="/font/stylesheet.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const sheets = new ServerStyleSheets()
  const originalRenderPage = ctx.renderPage

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    })

  const initialProps = await Document.getInitialProps(ctx)

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  }
}
