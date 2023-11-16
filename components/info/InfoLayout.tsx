import { ConfigProvider } from "antd";
import theme from "utils/theme";
import InfoHeader from "./InfoHeader";
import Footer from "./InfoFooter";

export default function InfoLayout(props: { children: React.ReactNode }) {
  return (
    <ConfigProvider theme={theme}>
      <InfoHeader />
      <main>{props.children}</main>
      <Footer />
    </ConfigProvider>
  );
}
