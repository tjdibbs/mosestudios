"use client";

import React from "react";
import { Button } from "antd";
import useFormControl from "hooks/useFormControl";
import { useForm } from "react-hook-form";
import LogoBig from "@assets/logo-big.png";
import Image from "next/image";

function ContactUs() {
  const { FormControl } = useFormControl(useForm());
  return (
    <div className="contact-us-container">
      <div className="flex gap-20 justify-center my-20 items-center flex-wrap">
        <div className="wrap">
          <div className="wrap text-center">
            <div className="page-title text-3xl font-bold mb-2 uppercase">
              Contact <span className="text-primary">Us</span>
            </div>
            <div className="text-light mb-8">
              Let's talk about how we can work together
            </div>
          </div>

          <form action="#" className="bg-white px-6 w-[500px] py-8">
            {FormControl({ name: "fullName", label: "Full Name" })}
            {FormControl({ name: "brandName", label: "Brand name" })}
            {FormControl({ name: "email" })}
            {FormControl({
              name: "message",
              type: "textarea",
              label: "Message",
            })}

            <div className="actions w-max mx-auto mt-10">
              <Button
                size="large"
                className="bg-bgDark text-white rounded-none px-8"
              >
                SEND
              </Button>
            </div>
          </form>
        </div>
        <div className="image-wrap">
          <Image
            src={LogoBig}
            width={400}
            height={400}
            alt="roshestudio logo"
          />
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
