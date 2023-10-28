"use client";

import { Button, Input } from "antd";
import { ArrowRight, Notification } from "iconsax-react";
import React from "react";
import Image from "next/image";
import ProfileImage from "@assets/profile.png";
import UploadedContent from "@comp/protected/UploadedContent";

function Dashboard() {
  return (
    <div className="customer-dashboard-container">
      <div className="page-container">
        <div className="header flex items-center justify-between">
          <div className="welcome-text font-bold text-2xl">
            Welcome Back, Moses
          </div>
          <div className="search">
            <Input.Search
              size="large"
              placeholder="Search for content"
              classNames={{ input: "py-2.5 rounded-l-xl" }}
              className="w-96 [&_input]:border-white [&_button]:border-white [&_button]:py-2.5 [&_button]:h-auto [&_button]:rounded-r-x"
            />
          </div>

          <div className="flex gap-3 items-center">
            <Button
              size="large"
              icon={<Notification />}
              className="border-white"
            />
            <div className="profile">
              <div className="bg-white px-3 py-1 rounded-lg text-gray-800 flex items-center gap-3">
                <div className="image">
                  <Image
                    src={ProfileImage}
                    className="border-full"
                    alt="profile"
                  />
                </div>
                <div className="wrap flex-1">
                  <div className="name font-bold">
                    Ebube Mike-Nzeagwu{" "}
                    <span className="bg-yellow-500 text-black rounded-xl font-bold py-1 text-xs px-2">
                      Gold
                    </span>
                  </div>
                  <div className="email text-xs text-gray-400">
                    ebube@powerlabstech.com
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10 mt-6 pr-3">
          <div className="wrap flex-grow">
            <div className="flex bg-bgDarkSecondary px-4 mb-10 py-6 rounded-xl gap-6 items-center">
              <div className="w-[63px] h-[63px] bg-zinc-100 rounded-full"></div>
              <div className="flex-1">
                <div className="text-2xl mb-2 font-bold tracking-tight">
                  New Content
                </div>
                <div className="text-base font-medium tracking-tight">
                  Upload content calender (PDF, EXL or Word document)
                </div>
              </div>
              <div className="text-neutral-400 text-sm font-bold">
                Remaining : 1
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <UploadedContent />
              <UploadedContent />
              <UploadedContent />
            </div>
          </div>
          <div className="wrap w-[300px]">
            <div className="text-yellow-500 text-[11px] font-semibold">
              Upgrade Account
            </div>
            <div className="text-zinc-400 text-[28px] font-bold my-5">
              Get More Value for your Contents
            </div>

            <Button className="border-primary text-primary font-bold w-full flex justify-between items-center h-12">
              <span>Upgrade Plan</span>
              <ArrowRight size="20" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
