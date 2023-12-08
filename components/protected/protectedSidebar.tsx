import React from "react";
import { useAppSelector } from "@redux/store";
import type { MenuProps } from "antd";
import { Affix, Button, Menu } from "antd";
import { ElementPlus, Logout } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/router";

import LargeLogo from "@assets/logo.png";
import SmallLogo from "@assets/logo-small.png";
import Image from "next/image";
import Cookie from "js-cookie";

type MenuItem = Required<MenuProps>["items"][number];
export interface MenuInfo {
  key: string;
  keyPath: string[];
}

const Sidebar: React.FC<{}> = (props) => {
  const user = useAppSelector((s) => s.session.user);
  const [collapse, setCollapse] = React.useState<boolean>(false);
  const router = useRouter();

  const [toggle, setToggle] = React.useState({
    selected: ["/dashboard"],
  });

  const onClick = (data: MenuInfo) => {
    console.log({ data });
    if (data.key == "/") {
      router.push(user?.userType == "client" ? "/dashboard" : "/admin");
    } else router.push(data.key);

    setToggle({ selected: [data.key] });
  };

  // React.useLayoutEffect(() => {
  //   if (props.sessionUser) {
  //     dispatch(LOGIN({ user: props.sessionUser, token: props.token }));
  //   }
  // }, [dispatch, props.sessionUser, props.token]);

  React.useEffect(() => {
    setCollapse(window.innerWidth < 1100);
    window.onresize = () => {
      if (window.innerWidth < 1100 && !collapse) {
        setCollapse(true);
      } else if (window.innerWidth > 1100 && collapse) {
        setCollapse(false);
      }
    };

    return () => {
      window.onresize = null;
    };
  }, [collapse]);

  React.useEffect(() => {
    if (user) {
      const key = "/" + (user.userType == "client" ? "dashboard" : "admin");
      setToggle({
        selected: [key],
      });
    }
  }, [user]);

  if (!user) return <></>;

  const menuItems = items(false, user.userType);
  console.log({ toggle, menuItems });

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
            defaultSelectedKeys={toggle.selected}
            selectedKeys={toggle.selected}
            openKeys={toggle.selected}
            items={menuItems}
            inlineCollapsed={collapse}
          />
        </div>
        <div className="sidebar-footer absolute bottom-0 left-0 p-3 right-0 items-center h-14 cursor-pointer flex mb-4 max-[900px]:justify-center max-[900px]:[&_.ant-menu-title-content]:hidden [&.ant-menu-item-selected]:bg-primary [&.ant-menu-item-selected]:text-black">
          <Button
            onClick={() => {
              Cookie.remove("tk", { path: "/" });
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

function getItem(params: {
  label: React.ReactNode;
  key: string;
  icon?: React.ReactNode;
  disabled?: boolean;
  children?: MenuItem[];
  type?: string;
}): MenuItem {
  const { key, icon, disabled, children = [], label, type = "group" } = params;
  return {
    key,
    icon,
    children,
    className:
      "items-center h-14 cursor-pointer flex mb-4 max-[900px]:justify-center max-[900px]:[&_.ant-menu-title-content]:hidden [&.ant-menu-item-selected]:bg-primary [&.ant-menu-item-selected]:text-black",
    label: (
      <Link href={key}>
        <span className="font-bold">{label}</span>
      </Link>
    ),
    type,
    // disabled,
  } as MenuItem;
}

const items = (disabled: boolean, userType: "client" | "admin"): MenuItem[] => [
  getItem({
    label: "Dashboard",
    key: "/" + (userType == "client" ? "dashboard" : "admin"),
    icon: <ElementPlus size="24" className="min-w-[24px]" />,
    disabled,
  }),
  getItem({
    label: userType == "admin" ? "Affiliates" : "Invites",
    key: userType == "admin" ? `/admin/affiliates` : "/dashboard/invites",
    icon: <ElementPlus size="24" className="min-w-[24px]" />,
    disabled,
  }),
];

export default Sidebar;
