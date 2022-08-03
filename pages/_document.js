import { Html, Head, Main, NextScript } from "next/document";
import url from "https://fonts.googleapis.com/css2?family=Open+Sans&display=swap";

export default function Document() {
  return (
    <Html>
      <Head>
        <style>@import url({url})</style>
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
