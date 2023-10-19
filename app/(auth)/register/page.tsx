"use client";

import React from "react";
import Image from "next/image";
import LogoSmall from "@assets/logo-small.png";
import { Button, Divider, Input } from "antd";
import { GoogleSvg } from "@comp/svgs";
import { useForm } from "react-hook-form";
import FormControl from "@comp/FormControl";
import Link from "next/link";

function RegisterPage() {
  const { control } = useForm();
  return (
    <div className="register-container w-screen h-screen grid place-items-center">
      <div className="bg-white/70 rounded-lg shadow-lg w-[500px] p-6 text-black">
        <Link href={"/"}>
          <div className="logo w-max mx-auto mb-6">
            <Image src={LogoSmall} width={70} alt="roshestudios" />
          </div>
        </Link>

        <form action="#">
          <div className="form-header mb-4 text-center">
            <div className="form-title text-2xl font-bold mb-2">
              Sign Up for MoseStudios
            </div>
            <div className="secondary-text text-sm text-gray-600">
              Let’s begin your Power journey
            </div>
          </div>

          <Button
            type="primary"
            className="bg-white text-black flex items-center gap-x-2 h-12 w-full justify-center"
          >
            <GoogleSvg /> <span>Login with google </span>
          </Button>

          <Divider className="text-center">
            <span>OR</span>
          </Divider>

          <div className="flex gap-4 mb-4 flex-wrap">
            <div className="wrap w-[200px] min-w-[200px] flex-grow">
              {FormControl({
                name: "firstName",
                control,
                label: "First name",
                placeholder: "ie. ebube",
              })}
            </div>
            <div className="wrap w-[200px] min-w-[200px] flex-grow">
              {FormControl({
                name: "lastName",
                control,
                label: "Last name",
                placeholder: "ie. joe",
              })}
            </div>
          </div>
          {FormControl({
            name: "email",
            control,
            label: "Email Address",
            placeholder: "ebube@powerlabstech.com",
          })}
          <div className="form-group mt-4">
            <label htmlFor="password" className="text-sm mb-2 block">
              Password <span className="text-red-600 font-bold">*</span>
            </label>
            <Input.Password className="bg-white" placeholder="" size="large" />
            <div className="helper-text text-sm text-gray-500">
              8+ strong characters including symbols, uppercase, numbers
            </div>
          </div>

          <Button
            type="primary"
            className="w-full h-12 shadow-lg mt-10 text-black"
          >
            Login
          </Button>
          <div className="my-2 text-sm text-center">
            By submitting your information, you agree to Pai’s{" "}
            <b>
              <a href="#">Terms of service</a>
            </b>{" "}
            and{" "}
            <b>
              <a href="#">Privacy Policy</a>
            </b>
          </div>

          <div className="text-center mt-10">
            Have an account?{" "}
            <Link href={"/login"} className="font-bold">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterPage;
