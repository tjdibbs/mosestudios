// import type { Metadata } from "next";
import InfoHeader from "@comp/InfoHeader";
import { ConfigProvider } from "antd";
import theme from "utils/theme";

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
