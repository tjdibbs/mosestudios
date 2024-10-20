"use client";

import Image from "next/image";
import React from "react";
import Logo from "@assets/logo.png";
import { Affix, Button, Drawer, Dropdown } from "antd";
import { ArrowDown2, HambergerMenu } from "iconsax-react";
import { ItemType } from "antd/es/menu/hooks/useItems";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const navData = [
  {
    title: "About us",
    menu: ["mission & vision", "brand culture", "our team", "our story"],
  },
  {
    title: "Services",
    menu: [
      "sme social content packages",
      "3d animation",
      "2d animation",
      "architectural visualization",
      "product visualization",
      "motion graphics",
      "explainer video",
      "branding",
      "visual effect and video editing",
    ],
  },
  {
    title: "Works",
    menu: ["client works"],
  },
  {
    title: "Career",
    menu: ["internship", "remote jobs", "affiliate marketing"],
  },
  {
    title: "Contact",
    menu: [],
  },
];

function InfoHeader() {
  const [openDrawer, setOpenDrawer] = React.useState<boolean>(false);
  const router = useRouter();
  const currentLocation = usePathname();

  // console.log({ currentLocation });
  const navigators = (
    <nav className="navigators flex-grow items-center gap-3 flex flex-col md:flex-row">
      {navData.map((navMenu) => {
        const hasMenu = navMenu.menu.length;
        const button = (
          <Button
            key={navMenu.title}
            type="text"
            onClick={
              navMenu.title == "Contact"
                ? () => router.push(navMenu.title.toLocaleLowerCase())
                : undefined
            }
            className={
              "text-white text-sm [&.ant-dropdown-open]:bg-primary/50 w-full md:w-auto hover:bg-primary/50 flex items-center justify-between sm:justify-start gap-x-1" +
              (currentLocation.includes(navMenu.title.toLowerCase())
                ? " bg-primary/10"
                : "")
            }
          >
            <span>{navMenu.title}</span>
            {hasMenu ? <ArrowDown2 size="14" /> : ""}
          </Button>
        );
        return hasMenu ? (
          <Dropdown
            mouseEnterDelay={0}
            mouseLeaveDelay={0.1}
            key={navMenu.title}
            overlayClassName="border-t-2 border-b-0 border-x-0 border-solid border-primary"
            menu={{
              items: navMenu.menu.map<ItemType>((m) => {
                let pathname = m.replaceAll(" ", "-");

                let active = currentLocation.includes(pathname);

                if (m == "mission & vision") {
                  pathname = "mission";
                  active = currentLocation == "/mission";
                }

                if (navMenu.title == "Services") {
                  if (m == "sme social content packages") {
                    pathname = "/#" + pathname;
                  } else {
                    pathname = "/services/" + pathname;
                    if (typeof location != "undefined") {
                      active = location.href.includes(pathname);
                    }
                  }
                }

                return {
                  key: m,
                  label: <Link href={pathname}>{m}</Link>,

                  className:
                    "capitalize hover:bg-primary hover:text-black transition" +
                    (active ? " bg-primary/10" : ""),
                  onClick: () => setOpenDrawer(false),
                };
              }),
            }}
          >
            {button}
          </Dropdown>
        ) : (
          button
        );
      })}
      <div className="actions lg:hidden">
        {/* <Button
              className="h-10 w-10 grid place-items-center"
              icon={<ShoppingCart size="24" color="white" />}
              shape="circle"
              type="text"
            /> */}
        <Link href={"/login"}>
          <Button type="primary" className="text-black font-bold">
            Sign in
          </Button>
        </Link>
      </div>
    </nav>
  );

  return (
    <React.Fragment>
      <Affix rootClassName="z-50" className="z-50" offsetTop={0}>
        <header className="main-header z-50 relative top-0 bg-bgDark">
          <div className="header-wrapper max-w-7xl mx-auto p-4 gap-4 flex items-center">
            <Button
              shape="circle"
              type="text"
              onClick={() => setOpenDrawer(!openDrawer)}
              className="h-10 w-10 lg:hidden grid place-items-center rounded-xl"
              icon={<HambergerMenu size="32" />}
            />
            <div className="logo-wrap lg:mr-10 flex-1 lg:flex-none">
              <Link href={"/"}>
                <Image
                  alt="mosestudios logo"
                  src={Logo}
                  width={188}
                  height={32}
                  className="w-[150px] h-auto xs:w-[188px] xs:h-[32px]"
                  priority
                />
              </Link>
            </div>
            <div className="nav-container hidden lg:block flex-1">
              {navigators}
            </div>

            <div className="actions">
              {/* <Button
              className="h-10 w-10 grid place-items-center"
              icon={<ShoppingCart size="24" color="white" />}
              shape="circle"
              type="text"
            /> */}
              <Link href={"/login"}>
                <Button type="primary" className="text-black font-bold">
                  Sign in
                </Button>
              </Link>
            </div>
          </div>
        </header>
      </Affix>
      <Drawer
        title="Pages"
        placement={"left"}
        width={300}
        className="bg-bgDark"
        onClose={() => setOpenDrawer(false)}
        open={openDrawer}
      >
        {navigators}
      </Drawer>
    </React.Fragment>
  );
}

export default InfoHeader;
