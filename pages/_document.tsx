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
            content="Imagine you plan on launching a cutting-edge product but then, you are faced with a major issue.

How exactly do I present the uniqueness of your product or service to my target audience?

Fortunately, you don't have to worry anymore because your digital oasis of creativity is here to serve you!

We are a animation studio committed to transforming your visions into captivating digital experiences.

Our range of services include

➡ 3D Animation,
➡ 2D Animation,
➡ Motion Graphics,
➡ Explainer Videos,
➡ Product Visualization,
➡ Branding
➡ Visual Effect and Editing, and
➡ Architectural Visualization.

Let Roshe Studios be the magic storyteller of your next digital story"
          />
          <meta property="og:url" content="https://roshestudios.com/" />
          <meta property="og:site_name" content="RosheStudios" />
          <meta property="og:locale" content="en_US" />
          <meta
            property="og:image:url"
            content="https://roshestudios.com/images/logo-big.png"
          />
          <meta property="og:image:width" content="350" />
          <meta property="og:image:height" content="300" />
          <meta
            property="og:image:url"
            content="https://roshestudios.com/images/logo-big.png"
          />
          <meta property="og:image:alt" content="RosheStudios" />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content="RosheStudios" />
          <meta
            name="twitter:description"
            content="Imagine you plan on launching a cutting-edge product but then, you are faced with a major issue.

How exactly do I present the uniqueness of your product or service to my target audience?

Fortunately, you don't have to worry anymore because your digital oasis of creativity is here to serve you!

We are a animation studio committed to transforming your visions into captivating digital experiences.

Our range of services include

➡ 3D Animation,
➡ 2D Animation,
➡ Motion Graphics,
➡ Explainer Videos,
➡ Product Visualization,
➡ Branding
➡ Visual Effect and Editing, and
➡ Architectural Visualization.

Let Roshe Studios be the magic storyteller of your next digital story"
          />
          <meta
            name="twitter:image"
            content="https://roshestudios.com/images/logo-big.png"
          />
          <meta
            name="keywords"
            content="graphic,graphics,motion,animation,studio,roshestudios,roshe,studios,interface,design,animations,motion-graphics,illustration,Animation studio in Lagos,
Animation studio in Nigeria,Animation studio in west Africa,Animation studio in Africa,Digital content studio,Social media plans,Roshe studio,Animation Studio,2D Animation,3D Animation,Animated Short Films,Motion Graphics,Character Animation,Storyboarding,Visual Effects (VFX),Cartoon Animation,Animated Explainer Videos,Digital Animation,Animation Production,Animation Design,CGI Animation,Stop Motion Animation,Animated Series,Animation for Marketing,Illustration and Animation,Animated Commercials,Animated Content Creation,Explainer video,Branding"
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
            content="Imagine you plan on launching a cutting-edge product but then, you are faced with a major issue.

How exactly do I present the uniqueness of your product or service to my target audience?

Fortunately, you don't have to worry anymore because your digital oasis of creativity is here to serve you!

We are a animation studio committed to transforming your visions into captivating digital experiences.

Our range of services include

➡ 3D Animation,
➡ 2D Animation,
➡ Motion Graphics,
➡ Explainer Videos,
➡ Product Visualization,
➡ Branding
➡ Visual Effect and Editing, and
➡ Architectural Visualization.

Let Roshe Studios be the magic storyteller of your next digital story"
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
