import { ConfigProvider } from "antd";

export default function AuthLayout(props: { children: React.ReactNode }) {
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
      <div className="w-full h-full">{props.children}</div>
    </ConfigProvider>
  );
}
