import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="bg-white text-black">
        <Main />
        <NextScript />
        {/* <script
          src="https://api.glia.com/salemove_integration.js"
          async
        ></script> */}
      </body>
    </Html>
  )
}
