import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="shortcut icon" href="/images/logo-small.png" />
          <link rel="icon" href="/images/logo-small.png" />
          <link rel="apple-touch-icon" href="/images/logo-small.png" />
          <meta property="og:title" content="RosheStudios" />
          <meta
            property="og:description"
            content="Your graphics and animation studio"
          />
          <meta property="og:url" content="https://roshestudios.com/" />
          <meta property="og:site_name" content="RosheStudios" />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:image:url"
            content="https://roshestudios.com/images/mose.gif"
          />
          <meta property="og:image:width" content="500" />
          <meta property="og:image:height" content="500" />
          <meta
            property="og:image:url"
            content="https://roshestudios.com/images/mose.gif"
          />
          <meta property="og:image:width" content="500" />
          <meta property="og:image:height" content="500" />
          <meta property="og:image:alt" content="RosheStudios" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site:id" content="1467726470533754880" />
          <meta name="twitter:creator" content="@tjdibbs" />
          <meta name="twitter:creator:id" content="1467726470533754880" />
          <meta name="twitter:title" content="RosheStudios" />
          <meta
            name="twitter:description"
            content="Your graphics and animation studio"
          />
          <meta
            name="twitter:image"
            content="https://roshestudios.com/images/mose.gif"
          />
          <meta
            name="keywords"
            content="graphic,graphics,motion,animation,studio,roshestudios,roshe,studios,interface,design,animations,motion-graphics,illustration"
          />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700;800;900&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;600;700;800;900&display=swap"
            rel="stylesheet"
          />

          <title>Roshestudios</title>
          <meta
            name="description"
            content="Your graphics and animation studio"
          />
        </Head>
        <body className="bg-bgDark text-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// MyDocument.getInitialProps = async (ctx) => {
//   const sheets = new ServerStyleSheets();
//   const originalRenderPage = ctx.renderPage;

//   ctx.renderPage = () =>
//     originalRenderPage({
//       enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
//     });

//   const initialProps = await Document.getInitialProps(ctx);

//   return {
//     ...initialProps,
//     styles: [
//       ...React.Children.toArray(initialProps.styles),
//       sheets.getStyleElement(),
//     ],
//   };
// };
