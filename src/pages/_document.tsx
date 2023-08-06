import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Handjet:wght@400&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body
        style={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
