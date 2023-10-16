"use client";

import React from "react";
import Image from "next/image";
import LogoSmall from "@assets/logo-small.png";
import { Button, Checkbox, Divider, Input } from "antd";
import { GoogleSvg } from "@comp/svgs";
import { useForm } from "react-hook-form";
import FormControl from "@comp/FormControl";
import Link from "next/link";

function ForgotPasswordPage() {
  const { control } = useForm();
  return (
    <div className="forgot-password-container w-screen h-screen grid place-items-center">
      <div className="bg-white/70 rounded-lg shadow-lg w-[400px] p-6 text-black">
        <Link href={"/"}>
          <div className="logo w-max mx-auto mb-6">
            <Image src={LogoSmall} width={70} alt="roshestudios" />
          </div>
        </Link>

        <form action="#">
          <div className="form-header mb-4 text-center">
            <div className="form-title text-2xl font-bold mb-2">
              Forgot Password
            </div>
            <div className="secondary-text text-sm text-gray-600">
              Enter your email for a link to reset your password
            </div>
          </div>

          {FormControl({
            name: "email",
            control,
            label: "Email address",
            placeholder: "name@example.com",
          })}

          <Button
            type="primary"
            className="w-full h-12 shadow-lg mt-10 text-black"
          >
            Continue
          </Button>

          <div className="text-center mt-10">
            Remember your password?{" "}
            <Link href={"/login"} className="font-bold">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
