import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { store } from "@redux/store";
import NextNProgress from "nextjs-progressbar";

import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <NextNProgress color="#e9b404" />
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
