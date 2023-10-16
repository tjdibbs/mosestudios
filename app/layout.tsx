import React from "react";
import StyledComponentsRegistry from "@lib/AntdRegistry";
import type { Metadata } from "next";
import "./font.css";
import "./globals.css";

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
      <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
    </body>
  </html>
);

export default RootLayout;
