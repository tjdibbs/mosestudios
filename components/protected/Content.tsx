"use client";

import Image from "next/image";
import React from "react";
import ProfileImage from "@assets/profile.png";
import { More } from "iconsax-react";
import ContentType from "@models/contentModel";
import User from "@models/userModel";
import { Button, Dropdown } from "antd";

function Content(props: { content: ContentType }) {
  const { content } = props;
  const user = content.userId as unknown as User;

  return (
    <div className="content-wrap bg-bgDarkSecondary rounded-lg mb-4 p-4">
      <div className="flex gap-3 mb-3 items-center">
        <div className="image">
          <Image src={ProfileImage} className="border-full" alt="profile" />
        </div>
        <div className="wrap flex-1">
          <div className="name font-bold text-lg">
            {user.firstName} {user.lastName}
          </div>
          <div className="email text-xs text-gray-400">{user.email}</div>
        </div>
        <Dropdown
          trigger={["click"]}
          menu={{
            items: [
              {
                label: "Submit Job",
                key: "submit",
                onClick: () => console.log({ action: "submit" }),
              },
            ],
          }}
        >
          <Button shape="circle" size="large" icon={<More size="32" />} />
        </Dropdown>
      </div>
      <div className="date mb-2">
        Date Created: {new Date(content.createdAt).toDateString()}
      </div>
      <div className="description">
        <div className="title font-bold text-xl mb-2">{content.title}</div>
        <div className="text-sm">{content.description}</div>
      </div>
      {content.document && (
        <a href={content.document} target="_blank" rel="noopener noreferrer">
          <div className="file border border-solid rounded-2xl bg-bgDark p-2 flex items-center gap-3 w-max mt-3">
            <div className="bg-red-800 text-sm text-black font-bold rounded-lg p-1.5 ">
              PDF
            </div>
            <div className="font-bold text-white text-sm">Document</div>
          </div>
        </a>
      )}
    </div>
  );
}

export default Content;
