// import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import theme from "utils/theme";
import { Metadata } from "next";
import InfoHeader from "./InfoHeader";
import Footer from "./InfoFooter";

export const metadata: Metadata = {
  title: "Mosestudios",
  description: "Your graphics and animation studio",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <InfoHeader />
      <main>{props.children}</main>
      <Footer />
    </ConfigProvider>
  );
}
