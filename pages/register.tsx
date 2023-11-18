"use client";

import React from "react";
import Image from "next/image";
import { Button, Divider, Input, message as Alert } from "antd";
import { GoogleSvg } from "@comp/svgs";
import Link from "next/link";
import useFormControl from "@hooks/useFormControl";
import useFetch from "@hooks/useFetch";
import { config } from "@lib/constants";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@redux/store";
import { LOGIN } from "@redux/slices/sessionSlice";
import AuthLayout from "@comp/auth/AuthLayout";

type FormDataType = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

function RegisterPage() {
  const [registered, setRegistered] = React.useState<boolean>(false);
  const { FormControl, handleSubmit } = useFormControl<FormDataType>({});
  const { fetcher, fetching } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const submit = React.useCallback(
    async (formData: FormDataType) => {
      const res = await fetcher<{ token: string; user: Roshestudios.User }>({
        url: config.urls.register,
        data: formData,
        method: "POST",
      });

      console.log({ res });

      if (!res.success || res.error)
        return Alert.error(
          res.message ?? res.error ?? "Unknown error occurred"
        );

      // Alert.success(res.message);
      setRegistered(true);
      dispatch(LOGIN({ user: res.user, token: res.token }));
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 1000);
    },
    [fetcher, router]
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
          <div className="registered text-center  border border-solid border-primary/50 rounded-2xl shadow-2xl shadow-[#fff]/50 w-[500px] p-6 pb-8 text-black">
            {Logo}

            <div className="mb-4 text-center">
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

export default RegisterPage;
