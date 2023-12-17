import { Affix, Input, Dropdown, MenuProps, Button } from "antd";
import { TextalignLeft } from "iconsax-react";
import Image from "next/image";
import ProfileImage from "@assets/profile.png";
import User from "@models/userModel";
import NotificationsDropDown from "@comp/NotificationsDropDown";
import Affiliate from "@models/affiliateModel";
import LargeLogo from "@assets/logo.png";
import Cookies from "js-cookie";
import { format } from "date-fns";
import Link from "next/link";
import { emitCustomEvent } from "react-custom-events";

export const Header = (props: { user: User<Affiliate>; search?: boolean }) => {
  const user = props.user;
  return (
    <Affix offsetTop={0}>
      <div className="md:hidden flex items-center gap-4 bg-bgDark py-4">
        <Button
          shape="circle"
          className="grid place-items-center"
          size="large"
          type="text"
          onClick={() => emitCustomEvent("open-sidebar")}
          icon={<TextalignLeft size="28" className="block" />}
        />
        <Image
          alt="roshestudios logo"
          src={LargeLogo}
          className="w-[188px] h-[32px]"
        />
      </div>
      <div className="header bg-bgDark pb-4 flex items-center justify-between">
        <div className="welcome-text font-bold text-xl sm:text-2xl capitalize">
          Hello {user.firstName}{" "}
          <span className="animate-bounce text-2xl">👋</span>
        </div>
        {props.search && (
          <div className="search hidden sm:block">
            <Input.Search
              size="large"
              placeholder="Search for content"
              classNames={{ input: "py-2.5 rounded-l-full" }}
              className="w-96 [&_input]:border-white [&_button]:border-white [&_button]:py-2.5 [&_button]:h-auto [&_button]:w-12 [&_button]:rounded-r-full"
            />
          </div>
        )}

        <div className="flex gap-3 items-center">
          <NotificationsDropDown />
          <div className="profile">
            <Dropdown
              menu={{
                items: menuItems(user),

                className:
                  "shadow-2xl rounded-xl overflow-hidden px-2 pb-6 border border-solid border-gray-300",
              }}
              trigger={["click"]}
              arrow
              rootClassName="[&_.ant-dropdown-arrow]:after:border [&_.ant-dropdown-arrow]:after:border-solid [&_.ant-dropdown-arrow]:after:content-['']"
            >
              <Image
                src={ProfileImage}
                alt="profile image"
                className="cursor-pointer rounded-full w-10 h-10 shadow-lg"
              />
            </Dropdown>
          </div>
        </div>
      </div>
    </Affix>
  );
};

enum PackageColor {
  gold = "yellow",
  silver = "lightgray",
  bronze = "brown",
  diamond = "#ff7000",
}

export const menuItems = (user: User<Affiliate>): MenuProps["items"] => [
  {
    label: (
      <div className="profile-wrapper">
        <div className="wrap flex items-start gap-x-2 pt-3">
          <Image
            src={ProfileImage}
            alt="profile image"
            className=" rounded-full w-10 h-10 shadow-lg"
          />

          <div className="detail">
            <div className="full-name capitalize font-semibold text-gray-200">
              {user.firstName} {user.lastName}
            </div>
            <p className="email text-sm text-gray-300">{user.email}</p>
          </div>
        </div>

        {user.plan && (
          <div className="joined flex items-center gap-x-2 text-sm font-semibold text-gray-200 mt-4 bg-neutral-800 p-2 rounded-lg">
            Plan:{" "}
            <span
              className="font-bold uppercase"
              style={{ color: PackageColor[user.plan] }}
            >
              {user.plan}
            </span>
          </div>
        )}
        <div className="joined flex items-center gap-x-2 text-sm font-semibold text-gray-200 mt-4 bg-primary/10 p-2 rounded-lg">
          <div className="bg-green-600 w-3 h-3 rounded-full" />
          Joined {format(new Date(user.createdAt), "MMMM dd,  yyyy")}
        </div>
      </div>
    ),
    type: "group",
    key: "profile-wrap",
    className: "mb-4",
  },
  {
    label: (
      <Link
        replace
        href={"/login"}
        onClick={() => {
          Cookies.remove("tk");
        }}
      >
        Logout
      </Link>
    ),
    key: "login",
  },
];

export default Header;
