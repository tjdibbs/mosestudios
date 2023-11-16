"use client";

import { Button, Input, message as Alert } from "antd";
import React from "react";
import useFetch from "@hooks/useFetch";
import { useTimer } from "react-timer-hook";
import { motion } from "framer-motion";
import { config } from "@lib/constants";
import OtpInput from "react-otp-input";
import { useRouter, useSearchParams } from "next/navigation";
import VerifiedImage from "@assets/verified.png";
import Image from "next/image";
import Link from "next/link";

const ExpiringTime = (min = 3) => {
  const time = new Date();
  time.setSeconds(time.getSeconds() + min * 60);

  return time;
};

function VerifyEmail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { fetching, fetcher } = useFetch();

  const [code, setCode] = React.useState<string>("");
  const [resend, setResend] = React.useState<boolean>(false);
  const [verified, setVerified] = React.useState<boolean>(false);

  const email = searchParams.get("email");

  const { seconds, minutes, restart, isRunning } = useTimer({
    expiryTimestamp: ExpiringTime(0.5),
    onExpire: () => setResend(true),
    autoStart: true,
  });

  const verifyEmail = async () => {
    if (code.length < 6) return Alert.error("Please enter 6-digits code");
    const res = await fetcher({
      url: config.urls.validateEmail,
      method: "POST",
      data: {
        email: searchParams.get("email"),
        otp: code,
      },
    });

    if (!res.success || res.error)
      return Alert.error(res.message ?? res.error ?? "Incorrect Code");

    setVerified(true);
  };

  if (verified) {
    return (
      <div className="grid place-items-center h-screen w-screen place-content-center">
        <div className="flex flex-col gap-4 w-full items-center">
          <motion.img
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            src={VerifiedImage.src}
            className="mb-6"
          />
          <div className="text-center text-3xl font-['Inter'] font-medium leading-[41.6px] text-[#111111]">
            Email verified
          </div>
          <div className="text-center text-lg font-['Inter'] leading-[23.4px] text-[#707070] mb-8">
            Now, you can continue with
            <br />
            onboarding process
          </div>
          <Button
            type="primary"
            size="large"
            onClick={() => router.push("/sign-up/company")}
            className="shadow-xl px-20 rounded-lg"
          >
            Login
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="grid w-screen h-screen place-items-center place-content-center text-black">
      <div className="verify-container max-w-[450px] bg-white rounded-xl p-6">
        <Link href={"/"}>
          <div className="logo w-max mx-auto mb-2">
            <Image
              src={"/images/mose.gif"}
              height={60}
              width={60}
              alt="roshestudios"
            />
          </div>
        </Link>

        <div className="text-center mb-6">
          <div className="text-xl font-black leading-[41.6px] text-[#111111]">
            Verify your email
          </div>
          <div className="text-sm leading-[23.4px] text-[#707070]">
            We have sent a verification code to{" "}
            <span className="contents font-bold text-yellow-600">
              {email?.substring(0, 3)}******@
              {email?.split("@")[1]}
            </span>{" "}
            {/* Not the right email? Change email */}
          </div>
        </div>

        <div className="form-group mb-10">
          <div className="form-group flex gap-x-4 w-[400px] justify-center max-w-full mx-auto my-5">
            <OtpInput
              value={code}
              inputType="tel"
              onChange={setCode}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  name="new-otp"
                  autoComplete="off"
                  className={
                    "w-full text-center border-solid focus:border-primary/60 border border-gray-300 mr-2 outline-0 font-extrabold text-2xl py-5 h-14 bg-bgDarkSecondary text-white focus:shadow-xl rounded-lg shadow-sm"
                  }
                />
              )}
            />
          </div>
          {/* <p>
          Didn't receive code ?{" "}
          <span className="timer text-primary font-bold">2:59s</span>
        </p> */}
        </div>

        <div className="actions flex flex-col gap-y-2">
          <Button
            type="primary"
            disabled={!code}
            size="large"
            loading={fetching}
            className="font-bold h-12"
            onClick={verifyEmail}
          >
            Verify
          </Button>

          <div className="wrap flex justify-center gap-2 flex-col items-center mt-5">
            <span>This code expires in 10 mins. Need a new code?</span>
            <Button
              size="small"
              type="text"
              className="text-black/90"
              disabled={!resend || isRunning}
              onClick={() => {
                // sendOtp({ email: formState.email?.text });

                // restart time
                restart(ExpiringTime());
                setResend(true);
              }}
            >
              {isRunning && (
                <span className="timer text-primary font-bold mr-2">
                  {minutes}:{seconds}s
                </span>
              )}
              <span className="underline">Resend Code</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;
