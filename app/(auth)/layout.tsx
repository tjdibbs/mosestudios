import { ConfigProvider } from "antd";
import theme from "utils/theme";

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontSize: 16,
          colorPrimary: "#e9b404",
          fontFamily: "'Noto Sans', sans-serif",
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
}
