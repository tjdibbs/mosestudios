"use client";

// import React from "react";
// import Image from "next/image";
// import LogoSmall from "@assets/logo-small.png";
// import { Button, Checkbox, Divider, Input } from "antd";
// import { GoogleSvg } from "@comp/svgs";
// import { useForm } from "react-hook-form";
// import FormControl from "@comp/FormControl";
// import Link from "next/link";

// function ForgotPasswordPage() {
//   const { control } = useForm();

//   return (
//     <div className="forgot-password-container w-screen h-screen grid place-items-center">
//       <div className="bg-white/70 rounded-lg shadow-lg w-[400px] p-6 text-black">
//         <Link href={"/"}>
//           <div className="logo w-max mx-auto mb-6">
//             <Image
//               src={"/images/mose.gif"}
//               height={100}
//               width={100}
//               alt="roshestudios"
//             />
//           </div>
//         </Link>

//         <form action="#">
//           <div className="form-header mb-4 text-center">
//             <div className="form-title text-2xl font-bold mb-2">
//               Forgot Password
//             </div>
//             <div className="secondary-text text-sm text-gray-600">
//               Enter your email for a link to reset your password
//             </div>
//           </div>

//           {FormControl({
//             name: "email",
//             control,
//             label: "Email address",
//             placeholder: "name@example.com",
//           })}

//           <Button
//             type="primary"
//             className="w-full h-12 shadow-lg mt-10 text-black"
//           >
//             Continue
//           </Button>

//           <div className="text-center mt-10">
//             Remember your password?{" "}
//             <Link href={"/login"} className="font-bold">
//               Sign in
//             </Link>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default ForgotPasswordPage;

import React from "react";
import Logo from "@assets/logo.png";
import { Button, Input, message as Alert } from "antd";
import useFetch from "@hooks/useFetch";
import { AnimatePresence, motion } from "framer-motion";
import { config } from "@lib/constants";
import isStrongPassword from "@lib/isStrongPassword";
import { Icon } from "@iconify/react";
import OtpInput from "react-otp-input";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import AuthLayout from "@comp/auth/AuthLayout";

type PageKey = keyof typeof pageData;
type FormStateType = {
  code: string;
  email: string;
  password: string;
};

const pageData = {
  send: {
    input: "email",
    title: "Forgot Password",
    placeholder: "Enter your registered email",
    btnText: "Get code",
    text: () =>
      "Enter your email address and we'll send you an email with instructions to reset your password.",
  },
  reset: {
    input: "code",
    title: "Reset Password",
    placeholder: "Enter 6 digit code",
    btnText: "Reset Password",
    text: (email?: string) => (
      <span>
        6 digit Code has been sent to your provided email{" "}
        <b className="text-yellow-600">{email}</b>, Please enter it to complete
        the password reset process
      </span>
    ),
  },
};

function ForgotPassword() {
  const [pageKey, setPageKey] = React.useState<PageKey | "success">("send");
  const { fetcher, fetching } = useFetch();
  const router = useRouter();

  const [formState, setFormState] = React.useState<FormStateType>({
    email: "",
    code: "",
    password: "",
  });

  const formEventHandler: {
    [x in PageKey]: (
      e: React.FormEvent,
      state: typeof formState
    ) => Promise<void>;
  } = {
    // Send code user provided email
    send: React.useCallback(async (_, state) => {
      if (!state.email) Alert.error("Please enter your registered email");
      else {
        const res = await fetcher({
          url: config.urls.forgotPassword,
          method: "POST",
          data: { email: state.email },
        });

        if (!res.success || res.error) {
          Alert.error(res.message ?? res.error ?? "Unable to send code");
          return;
        }

        setPageKey("reset");
      }
    }, []),

    // Verify the code sent to user email
    reset: React.useCallback(
      async (_, state) => {
        if (state.code.length != 6) Alert.error("Please enter 6 digit code");
        else if (!isStrongPassword(state.password))
          Alert.error(
            "Password must be minimum length of 8 and must have uppercase. lowercase, digit and symbol.",
            2.5
          );
        else {
          const res = await fetcher({
            url: config.urls.resetPassword,
            method: "POST",
            data: {
              email: state.email,
              otp: state.code,
              password: state.password,
            },
          });

          if (!res.success || res.error) {
            Alert.error(
              res.message ??
                res.error ??
                "Unable to verify code, please try again"
            );
            return;
          }

          setPageKey("success");
        }
      },
      [fetcher]
    ),
  };

  const goBack = React.useCallback(function (this: PageKey) {
    setPageKey("reset");
    setFormState((s) => ({ ...s, code: "" }));
  }, []);

  const handleChange = React.useCallback(function (
    this: PageKey,
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    setFormState((s) => ({ ...s, [pageData[this].input]: e.target.value }));
  },
  []);

  return (
    <AuthLayout>
      <div className="forgot-password h-screen w-screen overflow-auto grid place-items-center">
        <div className="wrapper grid items-center justify-center">
          <AnimatePresence mode="popLayout">
            {pageKey !== "success" ? (
              <motion.form
                action="#"
                key={pageKey}
                onSubmit={(e) => {
                  e.preventDefault();
                  formEventHandler[pageKey](e, formState);
                }}
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                id={pageKey}
                className="bg-white/90 text-black border border-solid border-yellow-600 shadow-2xl shadow-white/30 px-10 py-10 rounded-xl w-[450px] max-w-[90vw]"
              >
                <Link href={"/"}>
                  <div className="logo w-max mx-auto mb-2">
                    <Image
                      src={"/images/mose.gif"}
                      height={100}
                      width={100}
                      alt="roshestudios"
                    />
                  </div>
                </Link>
                <motion.div animate className="form-header mb-6 text-center">
                  <p className="form-title font-bold text-lg mb-4">
                    {pageData[pageKey].title}
                  </p>
                  <p className="mb-4 block text-sm">
                    {pageData[pageKey].text(formState.email)}
                  </p>
                </motion.div>

                {pageKey === "send" && (
                  <div className="form-control">
                    <label htmlFor="email" className="block mb-2 font-semibold">
                      {" "}
                      Email Address
                    </label>
                    <Input
                      type="email"
                      id="user-email"
                      size="large"
                      value={formState.email}
                      onChange={handleChange.bind(pageKey)}
                      placeholder={pageData.send.placeholder}
                      className="shadow-sm w-full rounded-lg border border-solid border-gray-400"
                    />
                  </div>
                )}

                {pageKey === "reset" && (
                  <>
                    <div className="form-group flex gap-x-4 w-[400px] max-w-full mx-auto my-5">
                      <OtpInput
                        value={formState.code}
                        inputType="tel"
                        onChange={(otp) =>
                          setFormState((s) => ({ ...s, code: otp }))
                        }
                        numInputs={6}
                        renderInput={(props) => (
                          <input
                            {...props}
                            name="new-otp"
                            autoComplete="off"
                            className={
                              "w-full text-center border-solid focus:border-primary/60 border border-gray-300 mr-2 outline-0 font-extrabold text-2xl py-5 h-18 focus:shadow-xl rounded-lg shadow-sm"
                            }
                          />
                        )}
                      />
                    </div>
                    <div className="form-control max-w-[400px] mx-auto">
                      <Input.Password
                        id="user-password"
                        size="large"
                        value={formState.password}
                        onChange={({ target }) =>
                          setFormState((s) => ({
                            ...s,
                            password: target.value,
                          }))
                        }
                        autoComplete="off"
                        name="new-password"
                        classNames={{ input: "py-2.5 pl-3" }}
                        placeholder={"Enter your new password"}
                        className="shadow-sm w-full pl-0 py-0 rounded-lg border border-solid border-gray-400 overflow-hidden"
                      />
                      <div className="helper-text text-sm mt-2">
                        Password must be minimum length of 8 and must have
                        uppercase. lowercase, digit and symbol.
                      </div>
                    </div>
                  </>
                )}

                <div className="actions mt-10 flex justify-end items-center gap-x-4">
                  {pageKey == "reset" && (
                    <Button
                      className="font-bold px-5 rounded-lg shadow-xl"
                      size="large"
                      onClick={goBack.bind(pageKey)}
                    >
                      Back
                    </Button>
                  )}
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={fetching}
                    className="font-bold px-5 rounded-lg shadow-xl text-black"
                    size="large"
                  >
                    {pageData[pageKey].btnText}
                  </Button>
                </div>
                <div className="mt-4 text-center leading-8">
                  <span>Remember your password</span> <br />
                  <Link
                    className="font-bold ml-3 text-yellow-600"
                    href={"/login"}
                  >
                    Back to Sign in
                  </Link>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                exit={{ opacity: 0, scale: 0.5 }}
                id={pageKey}
                className="bg-white border border-solid border-yellow-600 shadow-2xl px-10 py-10 rounded-tl-none rounded-xl w-[600px] max-w-full"
              >
                <div className="title font-bold text-2xl mb-4">
                  Password Reset Successfully
                </div>

                <Link href="/login" replace>
                  <Button size="large" type="primary">
                    Sign in
                  </Button>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </AuthLayout>
  );
}

export default ForgotPassword;
