import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  const url = new URL(
    "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap",
    import.meta.url
  );
  return (
    <Html>
      <Head>
        <style>@import {url.pathname}</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
