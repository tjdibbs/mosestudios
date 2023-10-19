import { ConfigProvider } from "antd";

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
