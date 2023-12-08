"use client";

import React from "react";
import Image from "next/image";
import { Button, Divider, Input, message as Alert, Modal } from "antd";
import { GoogleSvg } from "@comp/svgs";
import Link from "next/link";
import useFormControl from "@hooks/useFormControl";
import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";
import { useRouter } from "next/router";
import { useAppDispatch } from "@redux/store";
import { LOGIN } from "@redux/slices/sessionSlice";
import AuthLayout from "@comp/auth/AuthLayout";
import User from "@models/userModel";
import { GetServerSideProps } from "next";
import { Affiliates } from "@models/index";
import copyToClipboard from "@lib/copyToClipboard";
import { serialize } from "cookie";

type FormDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  referrerCode: string;
};

function RegisterPage() {
  const [registered, setRegistered] = React.useState<boolean>(false);
  const router = useRouter();
  const { FormControl, handleSubmit } = useFormControl<Partial<FormDataType>>({
    defaultValues: {
      referrerCode: router.query.referrerCode as string,
    },
  });
  const { fetcher, fetching } = useFetch();

  const dispatch = useAppDispatch();

  const submit = React.useCallback(
    async (formData: Partial<FormDataType>) => {
      const res = await fetcher<{ token: string; user: User }>({
        url: config.urls.register,
        data: formData,
        method: "POST",
      });

      if (!res.success || res.error)
        return Alert.error(
          res.message ?? res.error ?? "Unknown error occurred"
        );

      // Alert.success(res.message);
      setRegistered(true);
      dispatch(LOGIN({ user: res.user, token: res.token }));

      const _r = router.query._r as string;
      router.push(_r || `/plans`);
    },
    [dispatch, fetcher, router]
  );

  const Logo = (
    <Link href={"/"}>
      <div className="logo w-max mx-auto mb-4">
        <Image
          src={"/images/mose.gif"}
          height={100}
          width={100}
          alt="roshestudios"
        />
      </div>
    </Link>
  );

  return (
    <AuthLayout>
      <div className="register-container w-screen h-screen grid items-center justify-center overflow-x-hidden">
        {!registered ? (
          <div className="bg-white border border-solid border-primary/50 rounded-2xl shadow-2xl shadow-[#fff]/50 w-[500px] max-w-[90vw] p-6 text-black">
            {Logo}
            <form action="#" onSubmit={handleSubmit(submit)}>
              <div className="form-header mb-4 text-center">
                <div className="form-title text-2xl font-bold mb-2">
                  Sign Up for RosheStudios
                </div>
              </div>

              {/* <Button
                type="primary"
                className="bg-[#fff] text-black flex items-center gap-x-2 h-12 w-full justify-center"
              >
                <GoogleSvg /> <span>Login with google </span>
              </Button>

              <Divider className="text-center">
                <span>OR</span>
              </Divider> */}

              <div className="flex gap-4 mb-4 flex-wrap">
                <div className="wrap w-[200px] min-w-[200px] flex-grow">
                  {FormControl({
                    name: "firstName",
                    label: "First name",
                    placeholder: "ie. ebube",
                  })}
                </div>
                <div className="wrap w-[200px] min-w-[200px] flex-grow">
                  {FormControl({
                    name: "lastName",
                    label: "Last name",
                    placeholder: "ie. joe",
                  })}
                </div>
              </div>
              {FormControl({
                name: "email",
                label: "Email Address",
                placeholder: "ebube@powerlabstech.com",
              })}
              {FormControl({
                name: "phone",
                label: "Phone number",
                placeholder:
                  "+44 - - - - - - - - - - -  OR  +234 - - - - - - - - - - -",
              })}
              {FormControl({
                name: "company",
                label: "Company",
                placeholder: "Enter company name",
              })}
              {FormControl({
                name: "referrerCode",
                required: false,
                label: "Referrer's Code (optional)",
                placeholder: "Enter your referrer's code",
              })}

              <div className="form-group mt-4">
                {FormControl({
                  name: "password",
                  label: "Password",
                  placeholder: "*****",
                  inputType: "password",
                  autoComplete: false,
                })}
                <div className="helper-text text-sm text-gray-500">
                  8+ strong characters including symbols, uppercase, numbers
                </div>
              </div>

              <Button
                type="primary"
                htmlType="submit"
                loading={fetching}
                className="w-full h-12 shadow-lg mt-10 text-black font-bold"
              >
                Submit
              </Button>

              <div className="text-center mt-10">
                Have an account?{" "}
                <Link href={"/login"} className="font-bold">
                  Sign in
                </Link>
              </div>
            </form>
          </div>
        ) : (
          <div className="registered text-center  border border-solid border-primary/50 rounded-2xl shadow-2xl shadow-white/10 w-[500px] p-6 pb-8 text-black">
            {Logo}

            <div className="mb-4 text-center text-gray-100">
              <div className="form-title text-2xl font-bold mb-2">
                Account Created
              </div>
              <p>
                You can now begin using explore. We would automatically redirect
                you to your dashboard.
              </p>
            </div>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  query,
  res,
  req,
}) => {
  const referrerCode = query.referrerCode as string;
  const clicked = req.cookies.clicked;

  if (!clicked && referrerCode) {
    await Affiliates.findOneAndUpdate(
      { referrerCode },
      { $inc: { totalRefers: 1 } }
    );

    // set cookie for device, it tells if the device has been used to visit the site before
    const serialized = serialize("clicked", "true", {
      secure: process.env.NODE_ENV == "production",
      maxAge: 60 * 60 * 24 * 7 * 365,
      path: "/",
    });

    res.setHeader("Set-Cookie", serialized);
  }

  return {
    props: {},
  };
};

export default RegisterPage;
