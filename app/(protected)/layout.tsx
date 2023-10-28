// import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import theme from "utils/theme";
import { Metadata } from "next";
import Sidebar from "./protectedSidebar";

export const metadata: Metadata = {
  title: "Mosestudios",
  description: "Your graphics and animation studio",
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <div className="flex w-full">
        <Sidebar />
        <main className="p-4 flex-grow">{props.children}</main>
      </div>
    </ConfigProvider>
  );
}
