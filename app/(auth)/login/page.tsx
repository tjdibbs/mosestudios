"use client";

import React from "react";
import Image from "next/image";
import { Button, Checkbox, Divider, message as Alert } from "antd";
import { GoogleSvg } from "@comp/svgs";
import Link from "next/link";
import useFormControl from "@hooks/useFormControl";
import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";
import { useRouter } from "next/navigation";
import { LOGIN } from "@redux/slices/sessionSlice";
import { useAppDispatch } from "@redux/store";

type FormDataType = {
  email: string;
  password: string;
};

function LoginPage() {
  const { FormControl, handleSubmit } = useFormControl<FormDataType>({});
  const { fetcher, fetching } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const submit = async (formData: FormDataType) => {
    const res = await fetcher<{ token: string; user: Roshestudios.User }>({
      url: config.urls.login,
      data: formData,
      method: "POST",
    });

    console.log({ res });

    if (!res.success || res.error)
      return Alert.error(res.message ?? res.error ?? "Unknown error occurred");

    Alert.success(res.message);
    dispatch(LOGIN({ user: res.user, token: res.token }));

    router.push(res.user.userType == "admin" ? "/admin" : "/dashboard");
  };

  return (
    <div className="login-container w-screen h-screen grid place-items-center py-10">
      <div className="bg-white/90 rounded-lg shadow-lg w-[450px] p-6 px-8 text-black">
        <Link href={"/"}>
          <div className="logo w-max mx-auto mb-6">
            <Image
              src={"/images/mose.gif"}
              height={100}
              width={100}
              alt="roshestudios"
            />
          </div>
        </Link>

        <form action="#" onSubmit={handleSubmit(submit)}>
          <div className="form-header mb-4 text-center">
            <div className="form-title text-2xl font-bold mb-2">
              Login to your dashboard
            </div>
          </div>

          <Button
            type="primary"
            className="bg-[#fff] text-black flex items-center gap-x-2 h-12 w-full justify-center"
          >
            <GoogleSvg /> <span>Login with google </span>
          </Button>

          <Divider className="text-center">
            <span>OR</span>
          </Divider>

          {FormControl({
            name: "email",
            label: "Email address",
            placeholder: "name@example.com",
          })}
          {FormControl({
            name: "password",
            label: "Password",
            placeholder: "*******",
            inputType: "password",
          })}

          <Link
            href={"/forgot-password"}
            className="text-sm mt-5 block font-semibold w-max"
          >
            Forgot password ?
          </Link>

          <Button
            type="primary"
            htmlType="submit"
            loading={fetching}
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
