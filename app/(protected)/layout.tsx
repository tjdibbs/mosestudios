// import type { Metadata } from "next";
import { ConfigProvider } from "antd";
import theme from "utils/theme";
import { Metadata } from "next";
import Sidebar from "./protectedSidebar";
import getUserSession from "@lib/getUserSession";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Mosestudios",
  description: "Your graphics and animation studio",
};

export default async function RootLayout(props: { children: React.ReactNode }) {
  const { token, user } = await getUserSession();

  console.log({ user });

  if (!user) {
    redirect("/login");
    return <></>;
  }

  return (
    <ConfigProvider theme={theme}>
      <div className="flex w-full">
        <Sidebar sessionUser={user} token={token} />
        <main className="p-4 flex-grow">{props.children}</main>
      </div>
    </ConfigProvider>
  );
}
