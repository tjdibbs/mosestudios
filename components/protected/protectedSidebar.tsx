import React from "react";
import { useAppSelector } from "@redux/store";
import type { MenuProps } from "antd";
import { Affix, Button, Drawer, Menu } from "antd";
import { ElementPlus, Logout, MessageQuestion, Share } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";

import LargeLogo from "@assets/logo.png";
import SmallLogo from "@assets/logo-small.png";
import Image from "next/image";
import Cookie from "js-cookie";
import copyToClipboard from "@lib/copyToClipboard";
import { useCustomEventListener } from "react-custom-events";

// type MenuItem = Required<MenuProps>["items"][number];
export interface MenuInfo {
  key: string;
  keyPath: string[];
}

const Sidebar: React.FC<{}> = () => {
  const user = useAppSelector((s) => s.session.user);
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const [open, setOpen] = React.useState<boolean>(false);
  const router = useRouter();

  const [toggle, setToggle] = React.useState({
    selected: ["/dashboard"],
  });

  const onClick = (data: MenuInfo) => {
    router.push("/" + data.key);
    setToggle({ selected: [data.key] });
  };

  useCustomEventListener(
    "open-sidebar",
    () => {
      setOpen(true);
      setCollapse(false);
    },
    []
  );

  React.useEffect(() => {
    setCollapse(window.innerWidth < 1100);
    window.onresize = () => {
      if (window.innerWidth < 1100) {
        setCollapse((collapse) => !collapse && true);
      } else if (window.innerWidth > 1100) {
        setCollapse((collapse) => collapse && false);
      }
    };

    return () => {
      window.onresize = null;
    };
  }, []);

  React.useEffect(() => {
    setToggle({
      selected: [router.pathname.substring(1)],
    });
  }, [router]);

  if (!user) return <></>;

  const SidebarContent = (
    <React.Fragment>
      {
        <div className="sidebar-header min-[900]:px-6 w-full max-[900px]:grid place-items-center py-5 ">
          <div className="wrap">
            <Link href={"/"}>
              <Image
                alt="roshestudios logo"
                src={collapse ? SmallLogo : LargeLogo}
                className="w-[188px] sm:w-[40px] lg:w-[188px]  h-[32px]"
              />
            </Link>
          </div>
        </div>
      }
      <div className="sidebar-navigators">
        <Menu
          onClick={onClick}
          className="w-full bg-inherit text-inherit border-none"
          mode="inline"
          defaultSelectedKeys={toggle.selected}
          selectedKeys={toggle.selected}
          items={items(user.userType)}
          inlineCollapsed={collapse}
        />
      </div>
      <div className="sidebar-footer absolute bottom-0 flex flex-col justify-center  left-0 right-0 p-4 gap-4">
        <Button
          size="large"
          type="primary"
          className="text-block font-bold text-black flex justify-center items-center "
          onClick={() =>
            copyToClipboard(
              "https://roshestudios.com/register?referrerCode=" +
                user.affiliate.referrerCode
            )
          }
          icon={<MessageQuestion size={24} />}
        >
          Copy Link
        </Button>
        <Button
          onClick={() => {
            Cookie.remove("tk", { path: "/" });
            router.replace("/login");
          }}
          className="bg-dark text-white flex items-center h-auto gap-x-2 py-2 rounded-xl justify-center"
        >
          <Logout /> <span>Logout</span>
        </Button>
      </div>
    </React.Fragment>
  );

  return (
    <Affix offsetTop={0}>
      <div
        className={
          "sidebar-container relative h-screen bg-bgDarkSecondary p-4 hidden md:block " +
          (collapse
            ? "w-[60px] overflow-hidden"
            : "w-[250px] overflow-auto pl-4 ")
        }
      >
        {SidebarContent}
      </div>
      <Drawer placement="left" open={open} onClose={() => setOpen(false)}>
        {SidebarContent}
      </Drawer>
    </Affix>
  );
};

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    className:
      "items-center h-14 cursor-pointer flex mb-4 max-[900px]:justify-center sm:[&_.ant-menu-title-content]:hidden md:[&_.ant-menu-title-content]:block [&.ant-menu-item-selected]:bg-primary [&.ant-menu-item-selected]:text-black",
  } as MenuItem;
}

const items = (userType: "client" | "admin"): MenuItem[] => [
  getItem(
    "Dashboard",
    userType == "client" ? "dashboard" : "admin",
    <ElementPlus size="24" className="min-w-[24px]" />
  ),
  getItem(
    userType == "admin" ? "Affiliates" : "Invites",
    userType == "admin" ? `admin/affiliates` : "dashboard/invites",
    <Share size="24" className="min-w-[24px]" />
  ),
];

export default Sidebar;
