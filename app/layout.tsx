"use client";

import React from "react";
import StyledComponentsRegistry from "@lib/AntdRegistry";
import "./font.css";
import "./globals.css";
import { Provider } from "react-redux";
import { store } from "@redux/store";

const RootLayout = ({ children }: React.PropsWithChildren) => (
  <html lang="en">
    <head>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      {/* <link
        href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@500;600;700;800;900&display=swap"
        rel="stylesheet"
      /> */}
    </head>
    <body className="bg-bgDark text-white">
      <Provider store={store}>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </Provider>
    </body>
  </html>
);

export default RootLayout;
