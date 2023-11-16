"use client";

import useFormControl from "hooks/useFormControl";
import React from "react";
import Image from "next/image";
import { Button } from "antd";
import InfoLayout from "@comp/info/InfoLayout";

function Internship() {
  const { FormControl } = useFormControl({});
  return (
    <InfoLayout>
      <div className="internship-container px-4">
        <div className="page-title font-bold text-3xl sm:text-5xl mt-10 mb-6 text-center">
          APPLY FOR <span className="text-primary">INTERNSHIP</span>
        </div>

        <div className="text-wrap">
          <div className="text-center font-light text-[#adadad] text-sm sm:text-base">
            Are you passionate, talented and creative? 2D Artists or 3D Artists?
            <br />
            Application for internship program generally begins on November 1st,
            2022.
            <br />
            <br />
            <span className="font-bold">Key Output</span> - Provide creative
            ideas on projects, models, texture, light and render scenes in any
            popular application.
            <br />
            Character rigging and animation is an advantage for being selected.
            <br />
            <br />
            <span className="font-bold">Qualifications</span> -{"  "}
            Must have skills in either Motion Graphics, Concept Art or 3D
            Animation.
            <br />
            For Concept Artists, Must be proficient in Photoshop.
            <br />
            For 3D Artists, must have basic knowledge of any popular 3D software
            i.e Maya, 3Ds Max, Blender or Cinema4D.
            <br />
            Ability to draw is compulsory for Concept Artists. Ability to draw
            is also an advantage for 3D Artists <br />
            <br />
            <span className="font-bold">Personal Qualities</span> - Good
            communication skills, must be able to work with a team and must have
            a laptop and mouse.
            <br />
            <span className="font-bold">
              <br />
              To apply, simply fill the form below. Best of luck!
            </span>
          </div>
        </div>

        <div className="wrap flex justify-center gap-1 gap-x-[200px] my-20 items-center flex-wrap-reverse">
          <form action="#" className="bg-white px-6 w-[500px] py-8">
            {FormControl({ name: "fullName", label: "Full Name" })}
            {FormControl({ name: "phone" })}
            {FormControl({ name: "email" })}
            {FormControl({ name: "address", label: "Address" })}
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

export default Internship;
