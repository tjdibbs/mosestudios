"use client";

import { Button } from "antd";
import { Instagram, Youtube } from "iconsax-react";
import React from "react";
import { Icon } from "@iconify/react";

function Footer() {
  return (
    <footer>
      <div className="wrap-text text-center text-3xl font-extrabold my-6">
        ANY PROJECT IN MIND ?
        <Button
          type="text"
          size="large"
          className="text-primary font-bold text-3xl"
        >
          GET IN TOUCH
        </Button>
      </div>
      <div className="flex bg-black/50 items-center px-10 justify-between py-10 gap-6">
        <div className="wrap social-icons">
          <div className="text text-primary mb-4">LET’S STAY CONNECTED</div>
          <div className="icons flex gap-x-3 items-center">
            {socialIcons.map((icon) => (
              <a href={icon.link}>{icon.icon}</a>
            ))}
          </div>
        </div>
        <div className="wrap text-right">
          <div className="title text-primary font-bold text-2xl mb-4">
            Contact us
          </div>

          <div className="phone mb-2">
            <a
              href="tel:+2348103115400"
              className="no-underline text-white block"
            >
              +234-802-768-5574
            </a>
          </div>
          <div className="email mb-2">
            <a
              href="mailto:info@roshestudios.com"
              className="no-underline text-white block"
            >
              info@roshe<span className="text-primary">studios</span>.com
            </a>
          </div>
        </div>
      </div>

      <div className="copy-right text-center p-4 leading-6 py-10">
        © 2023 ROSHE<span className="text-primary font-semibold">STUDIOS</span>{" "}
        LLC. All Rights Reserved. The ROSHESTUDIOS logo and other ROSHE
        <span className="text-primary font-semibold">STUDIOS </span>
        marks, logo and trade dress are trademarks or registered trademarks of
        ROSHE<span className="text-primary font-semibold">STUDIOS</span> LLC.
      </div>
    </footer>
  );
}

const socialIcons = [
  {
    title: "instagram",
    link: "https://instagram.com/roshe_studios?igshid=NTc4MTIwNjQ2YQ==",
    icon: <Instagram size="32" className="text-white" />,
  },
  {
    title: "linkedin",
    icon: (
      <Icon icon="mingcute:linkedin-line" height={32} className="text-white" />
    ),
    link: "https://www.linkedin.com/company/roshestudios/",
  },
  {
    title: "twitter",
    icon: <Icon icon="mdi:twitter" height={32} className="text-white" />,
    link: "https://twitter.com/roshestudi18670",
  },
  {
    title: "youtube",
    icon: <Youtube size="32" className="text-white" />,
    link: "https://youtube.com/@roshestudios?si=1hWhiSQoU_6yXNEA",
  },
];

export default Footer;
