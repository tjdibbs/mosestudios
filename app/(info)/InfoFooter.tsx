import { Button } from "antd";
import { Facebook, Instagram } from "iconsax-react";
import React from "react";

function Footer() {
  return (
    <footer>
      <div className="wrap-text text-center text-2xl font-bold my-6">
        ANY PROJECT IN MIND ?
        <Button type="text" size="large" className="text-primary">
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
        <div className="wrap">
          <div className="title text-primary font-bold text-xl mb-4">
            Contact us
          </div>
          <div className="email mb-2">
            <a
              href="mailto:info@roshestudios.com"
              className="no-underline text-white block"
            >
              info@roshe<span className="text-primary">studios</span>.com
            </a>
          </div>
          <div className="phone">
            <a
              href="tel:+2348103115400"
              className="no-underline text-white block"
            >
              +2348103115400
            </a>
          </div>
        </div>
      </div>

      <div className="copy-right text-center p-4 leading-6">
        © 2023 ROSHE<span className="text-primary font-semibold">STUDIOS</span>{" "}
        LLC. All rights reserved. The ROSHESTUDIOS logo and other ROSHE
        <span className="text-primary font-semibold">STUDIOS</span>
        marks, logo and trade dress are trademarks or registered trademarks of
        ROSHE<span className="text-primary font-semibold">STUDIOS</span> LTD.
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
    title: "facebook",
    icon: <Facebook size="32" className="text-white" />,
    link: "https://facebook.com",
  },
];

export default Footer;
