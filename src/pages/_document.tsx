import * as React from 'react'
import Document, {
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document'
import { ServerStyleSheet } from 'styled-components'
import GlobalStyles from '../utils/global-styles'

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  styleTags: any
}

export default class MyDocument extends Document<Props> {
  static async getInitialProps({ req, renderPage }: DocumentContext) {
    const sheet = new ServerStyleSheet()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const page = renderPage((App: any) => (props: any) =>
      sheet.collectStyles(<App {...props} />)
    )
    const styleTags = sheet.getStyleElement()

    let userAgent
    if (req && req.headers) {
      userAgent = req.headers['user-agent']
    }

    // const initialProps = await Document.getInitialProps(context);
    return {
      ...page,
      styleTags,
      isPublic: !userAgent || !userAgent.match(/(ios|android)/i),
    }
  }

  render() {
    const {
      props: { styleTags },
    } = this

    return (
      <html lang="en">
        <Head>
          {styleTags}
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <link rel="manifest" href="/manifest.webmanifest" />
          <link
            rel="apple-touch-icon-precomposed"
            href="/icons/favicon-152x152.png"
          />
          <link rel="icon" href="/icons/favicon-152x152.png" />
          <meta name="msapplication-TileColor" content="#1CC0A6" />
          <GlobalStyles />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
