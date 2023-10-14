// import type { Metadata } from "next";
import InfoHeader from "@comp/InfoHeader";
import { ConfigProvider } from "antd";
import theme from "utils/theme";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mosestudios",
  description: "Your graphics and animation studio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider theme={theme}>
      <div className="main-container">
        <InfoHeader />
        <main>{children}</main>
      </div>
    </ConfigProvider>
  );
}
