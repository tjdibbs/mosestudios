import Image from "next/image";
import React from "react";
import Logo from "@assets/logo.png";
import { Button, Dropdown } from "antd";
import { ArrowDown2, ShoppingCart } from "iconsax-react";
import { ItemType } from "antd/es/menu/hooks/useItems";

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
  return (
    <header className="main-header">
      <div className="header-wrapper max-w-7xl mx-auto p-4 gap-4 flex items-center">
        <div className="logo-wrap flex mr-10">
          <Image
            alt="mosestudios logo"
            src={Logo}
            width={120}
            height={30}
            priority
          />
        </div>

        <nav className="navigators flex-grow flex items-center gap-x-3">
          {navData.map((navMenu) => {
            const hasMenu = navMenu.menu.length;
            const button = (
              <Button
                key={navMenu.title}
                type="text"
                className="text-white text-sm [&.ant-dropdown-open]:bg-primary/50 hover:bg-primary/50 flex items-center gap-x-1"
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
                  items: navMenu.menu.map<ItemType>((m) => ({
                    key: m,
                    label: m,
                    className:
                      "capitalize hover:bg-primary hover:text-black transition",
                  })),
                }}
              >
                {button}
              </Dropdown>
            ) : (
              button
            );
          })}
        </nav>

        <div className="actions">
          <Button
            className="h-10 w-10 grid place-items-center"
            icon={<ShoppingCart size="24" color="white" />}
            shape="circle"
            type="text"
          />
        </div>
      </div>
    </header>
  );
}

export default InfoHeader;
