"use client";

import React from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import type { MenuProps } from "antd";
import { Affix, Button, Menu } from "antd";
import { ElementPlus, Logout } from "iconsax-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import LargeLogo from "@assets/logo.png";
import SmallLogo from "@assets/logo-small.png";
import Image from "next/image";
import { LOGIN } from "@redux/slices/sessionSlice";
import Cookie from "js-cookie";

type MenuItem = Required<MenuProps>["items"][number];
export interface MenuInfo {
  key: string;
  keyPath: string[];
}

const Sidebar: React.FC<{ sessionUser: Roshestudios.User; token?: string }> = (
  props
) => {
  const user = useAppSelector((s) => s.session.user);
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const location = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();

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
    if (props.sessionUser) {
      dispatch(LOGIN({ user: props.sessionUser, token: props.token }));
    }
  }, [dispatch, props.sessionUser, props.token]);

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
        <div className="sidebar-footer absolute bottom-0 left-0 p-3 right-0">
          <Button
            onClick={() => {
              Cookie.remove("tk", {
                path: "/",
              });
              router.replace("/login");
            }}
            className="bg-dark text-white flex items-center h-auto gap-x-2 py-2 rounded-xl"
          >
            <Logout /> <span>Logout</span>
          </Button>
        </div>
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
