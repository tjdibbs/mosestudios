"use client";

import useFormControl from "hooks/useFormControl";
import React from "react";
import Image from "next/image";
import { Button } from "antd";
import InfoLayout from "@comp/info/InfoLayout";

function RemoteJobs() {
  const { FormControl } = useFormControl({});
  return (
    <InfoLayout>
      <div className="internship-container px-4">
        <div className="page-title font-bold text-3xl sm:text-5xl mt-10 mb-6 text-center">
          RE-IMAGINE YOUR <span className="text-primary">CAREER</span>
        </div>

        <div className="text-wrap text-sm sm:text-base">
          <div className="text-center font-light text-[#adadad]">
            At ROSHE<span className="text-[#f6bf02]">STUDIOS</span>, we believe
            in telling compelling stories and creating industry standard digital
            content solution.
            <br />
            Remote jobs will be open January 1st, 2024
            <br />
            <br />
            <span className="font-bold">Mode of Work</span> - Remote and
            Contract only.
            {"  "}
            <br />
            <span className="font-bold">
              <br />
              Key Output{" "}
            </span>
            - Provide creative output on ideas and tasks and must be able to
            communicate effectively. <br />
            <br />
            <span className="font-bold">Personal Qualities </span>
            <span>-</span>
            <span className="font-bold"> </span>Good communication skillls,
            ability to collaborate with team and deliver under deadlines
            <br />
            <br />
            <span className="font-bold">
              <br />
              To apply, simply fill the form below. Best of luck!
              <br />
            </span>
          </div>
        </div>

        <div className="wrap flex justify-center gap-16 gap-x-[200px] my-20 items-center flex-wrap-reverse">
          <form action="#" className="bg-white px-6 w-[500px] py-8">
            {FormControl({ name: "fullName", label: "Full Name" })}
            {FormControl({ name: "phone" })}
            {FormControl({ name: "email" })}
            {FormControl({ name: "address", label: "Address" })}
            {FormControl({ name: "position", label: "Position Applied For" })}
            {FormControl({ name: "portfolio", label: "Link to Portfolio" })}
            {FormControl({ name: "software", label: "Proficient Softwares" })}

            <div className="actions w-max mx-auto">
              <Button
                size="large"
                className="bg-bgDark px-8 text-white rounded-none"
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
              className="max-w-full h-auto"
              alt="roshestudio logo"
            />
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}

export default RemoteJobs;
