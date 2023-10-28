"use client";

import React from "react";
import { useAppSelector } from "@redux/store";
import type { MenuProps } from "antd";
import { Affix, Menu } from "antd";
import { ElementPlus } from "iconsax-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import LargeLogo from "@assets/logo.png";
import SmallLogo from "@assets/logo-small.png";
import Image from "next/image";

type MenuItem = Required<MenuProps>["items"][number];
export interface MenuInfo {
  key: string;
  keyPath: string[];
}

const Sidebar: React.FC = () => {
  const user = useAppSelector((s) => s.session.user);
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const location = usePathname();

  const [toggle, setToggle] = React.useState({
    selected: ["/dashboard"],
    opened: [""],
  });

  const onClick = (data: MenuInfo) => {
    // navigate(data.key);
    console.log({ data });
    setToggle({
      selected: [data.key],
      opened: [data.key],
    });
  };

  React.useLayoutEffect(() => {
    const pathname = location;

    // scroll to top after location change
    window.scrollTo({ top: 0 });
  }, [location]);

  React.useEffect(() => {
    setCollapse(window.innerWidth < 1024);
    window.onresize = () => {
      if (window.innerWidth < 1024 && !collapse) {
        setCollapse(true);
      } else if (window.innerWidth > 1024 && collapse) {
        setCollapse(false);
      }
    };

    return () => {
      window.onresize = null;
    };
  }, [collapse]);

  return (
    <Affix offsetTop={0}>
      <div
        className={
          "sidebar-container relative h-screen bg-bgDarkSecondary p-4 " +
          (collapse
            ? "w-[60px] overflow-hidden"
            : "w-[250px] overflow-auto pl-4")
        }
      >
        {
          <div className="sidebar-header min-[900]:px-6 w-full max-[900px]:grid place-items-center py-5 ">
            <div className="wrap">
              <Link href={"/"}>
                {" "}
                <Image
                  alt="roshestudios logo"
                  src={collapse ? SmallLogo : LargeLogo}
                  className="w-[40px] lg:w-[188px]  h-[32px]"
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
            defaultActiveFirst={true}
            openKeys={toggle.opened}
            selectedKeys={toggle.selected}
            items={items(false)}
            inlineCollapsed={collapse}
          />
        </div>
        <div className="sidebar-footer absolute bottom-0 left-0 p-3 right-0"></div>
      </div>
    </Affix>
  );
};

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  disabled?: boolean,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    className:
      "items-center h-14 flex mb-4 max-[900px]:justify-center max-[900px]:[&_.ant-menu-title-content]:hidden [&.ant-menu-item-selected]:bg-primary [&.ant-menu-item-selected]:text-black",
    label: !disabled ? (
      <Link href={key as string}>
        <span className="font-bold">{label}</span>
      </Link>
    ) : (
      <span className="font-medium">{label}</span>
    ),
    type,
    disabled,
  } as MenuItem;
}

const items: (disable: boolean) => MenuItem[] = (disable) => [
  getItem(
    "Dashboard",
    "/dashboard",
    <ElementPlus size="24" className="min-w-[24px]" />,
    disable
  ),
];

export default Sidebar;
