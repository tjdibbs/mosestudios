"use client";

import Image from "next/image";
import React from "react";
import ProfileImage from "@assets/profile.png";
import { More } from "iconsax-react";

function Content() {
  return (
    <div className="content-wrap bg-bgDarkSecondary rounded-lg mb-4 p-4">
      <div className="flex gap-3 mb-3 items-center">
        <div className="image">
          <Image src={ProfileImage} className="border-full" alt="profile" />
        </div>
        <div className="wrap flex-1">
          <div className="name font-bold text-lg">Ebube Mike-Nzeagwu</div>
          <div className="email text-xs text-gray-400">
            ebube@powerlabstech.com
          </div>
        </div>
        <More size="32" />
      </div>
      <div className="date mb-2">Date Created: {new Date().toDateString()}</div>
      <div className="description">
        <div className="title font-bold text-xl mb-2">Description</div>
        <div className="text-sm">
          Content for September - Animation for school Find more information in
          PDF attached
        </div>
      </div>
      <div className="file border border-solid rounded-2xl bg-bgDark p-2 flex items-center gap-3 w-max mt-3">
        <div className="bg-red-800 text-sm text-black font-bold rounded-lg p-1.5 ">
          PDF
        </div>
        <div className="font-bold text-white text-sm">
          School Animation Info
        </div>
      </div>
    </div>
  );
}

export default Content;
