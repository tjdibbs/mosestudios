"use client";

import useFormControl from "hooks/useFormControl";
import React from "react";
import { useForm } from "react-hook-form";
import LogoBig from "@assets/logo-big.png";
import Image from "next/image";
import { Button } from "antd";

function AffiliateMarketing() {
  const { FormControl } = useFormControl(useForm());
  return (
    <div className="internship-container">
      <div className="page-title font-bold text-5xl mt-10 mb-6 text-center">
        AFFILIATE <span className="text-primary">MARKETING</span>
      </div>

      <div className="text-wrap">
        <div className="text-center font-light text-[#addad]">
          At ROSH<span className="text-[#f6bf02]">STUDIOS</span>, we strongly
          believe in the power of network, opportunities and collaboration.
          <br />
          Become an affiliate marketer for our Subscription based Package, and
          get commissioned for every client you bring.
          <br />
          <br />
          <span className="font-bold">How Much Will I Earn?</span> - 10% for the
          subscription package.
          {"  "}
          <br />
          <span className="font-bold">
            <br />
            Steps{" "}
          </span>
          - Register as an affiliate marketer to get started
          <br />
          <span className="font-bold">
            <br />
            Start your journey as an affiliate marketer today! <br />
          </span>
          Terms and conditions apply.
        </div>
      </div>

      <div className="wrap flex justify-center gap-16 gap-x-[200px] my-20 items-center flex-wrap">
        <form action="#" className="bg-white px-6 w-[500px] py-8">
          {FormControl({ name: "fullName", label: "Full Name" })}
          {FormControl({ name: "phone" })}
          {FormControl({ name: "email" })}
          {FormControl({ name: "address", label: "Address" })}
          {FormControl({ name: "bankName", label: "Bank Name" })}
          {FormControl({ name: "accountName", label: "Bank Account Name" })}
          {FormControl({ name: "accountNumber", label: "Bank Account Number" })}

          <div className="actions w-max mx-auto">
            <Button
              size="large"
              className="bg-bgDark text-white rounded-none px-8"
            >
              APPLY
            </Button>
          </div>
        </form>

        <div className="image-wrap">
          <Image
            src={"/images/mose.gif"}
            width={500}
            height={500}
            alt="roshestudio logo"
          />
        </div>
      </div>
    </div>
  );
}

export default AffiliateMarketing;
