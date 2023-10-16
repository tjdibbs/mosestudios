"use client";

import React from "react";
import Image from "next/image";
import LogoSmall from "@assets/logo-small.png";
import { Button, Checkbox, Divider, Input } from "antd";
import { GoogleSvg } from "@comp/svgs";
import { useForm } from "react-hook-form";
import FormControl from "@comp/FormControl";
import Link from "next/link";

function LoginPage() {
  const { control } = useForm();
  return (
    <div className="login-container w-screen h-screen grid place-items-center">
      <div className="bg-white/70 rounded-lg shadow-lg w-[400px] p-6 text-black">
        <Link href={"/"}>
          <div className="logo w-max mx-auto mb-6">
            <Image src={LogoSmall} width={70} alt="roshestudios" />
          </div>
        </Link>

        <form action="#">
          <div className="form-header mb-4 text-center">
            <div className="form-title text-2xl font-bold mb-2">Login</div>
            <div className="secondary-text text-sm text-gray-600">
              Login to your account to continue accessing Pai
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

          {FormControl({
            name: "email",
            control,
            label: "Email address",
            placeholder: "name@example.com",
          })}
          <div className="form-group mt-4">
            <label htmlFor="password" className="text-sm mb-2 block">
              Password <span className="text-red-600 font-bold">*</span>
            </label>
            <Input.Password className="bg-white" placeholder="" size="large" />
          </div>
          <Link
            href={"/forgot-password"}
            className="text-sm mt-3 font-semibold"
          >
            Forgot password?
          </Link>

          <Button
            type="primary"
            className="w-full h-12 shadow-lg mt-10 text-black"
          >
            Login
          </Button>
          <div className="flex my-2 items-center gap-x-2 text-sm">
            <Checkbox />
            <span>Keep me signed in</span>
          </div>

          <div className="text-center mt-10">
            Don't have an account?{" "}
            <Link href={"/register"} className="font-bold">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
