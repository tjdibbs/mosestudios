// import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import theme from "utils/theme";
import Sidebar from "./protectedSidebar";

export default function ProtectedLayout(props: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <div className="flex w-full">
        <Sidebar />
        <main className="p-4 flex-grow max-w-7xl mx-auto">
          {props.children}
        </main>
      </div>
    </ConfigProvider>
  );
}
