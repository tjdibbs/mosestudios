"use client";

import { Button } from "antd";
import { Instagram, Whatsapp, Youtube } from "iconsax-react";
import React from "react";
import { Icon } from "@iconify/react";

function Footer() {
  return (
    <footer className="mt-8">
      <div className="wrap-text text-center text-2xl sm:text-5xl font-extrabold my-6">
        ANY PROJECT IN MIND ?
        <Button
          type="text"
          size="large"
          className="text-primary font-bold text-2xl sm:text-5xl"
        >
          GET IN TOUCH
        </Button>
      </div>
      <div className="wrap bg-black/50">
        <div className="flex flex-wrap px-24 mx-auto items-start justify-end  py-10 gap-6">
          <div className="wrap social-icons flex-grow">
            <div className="text-2xl font-bold text-primary mb-4">
              Let's stay connected
            </div>
            <div className="icons flex gap-x-3 items-center">
              {socialIcons.map((icon, index) => (
                <a key={index} href={icon.link} target="_blank">
                  {icon.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="wrap text-right w-max">
            <div className="title text-primary font-bold text-2xl mb-4">
              Contact us
            </div>

            <div className="phone mb-2">
              <a
                href="tel:+2348103115400"
                className="no-underline text-white block text-xl"
              >
                +234-802-768-5574
              </a>
              {/* <a
                href="tel:+447917904869"
                className="no-underline text-white block"
              >
                +447917904869
              </a> */}
            </div>
            <div className="email mb-2 ">
              <a
                href="mailto:info@roshestudios.com"
                className="no-underline text-white block text-xl"
              >
                info@roshe<span className="text-primary">studios</span>.com
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="copy-right text-center p-4 text-sm leading-6 py-10">
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
    title: "whatsapp",
    link: "https://wa.me/+2348027685574",
    icon: <Whatsapp size="40" color="white" />,
  },
  {
    title: "instagram",
    link: "https://instagram.com/roshe_studios?igshid=NTc4MTIwNjQ2YQ==",
    icon: <Instagram size="40" className="text-white" />,
  },
  {
    title: "linkedin",
    icon: (
      <Icon icon="mingcute:linkedin-line" height={40} className="text-white" />
    ),
    link: "https://www.linkedin.com/company/roshestudios/",
  },
  {
    title: "twitter",
    icon: <Icon icon="mdi:twitter" height={40} className="text-white" />,
    link: "https://twitter.com/roshestudi18670",
  },
  {
    title: "youtube",
    icon: <Youtube size="40" className="text-white" />,
    link: "https://youtube.com/@roshestudios?si=1hWhiSQoU_6yXNEA",
  },
];

export default Footer;
