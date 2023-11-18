import InfoLayout from "@comp/info/InfoLayout";
import { Button } from "antd";
import React from "react";

function OurStory() {
  return (
    <InfoLayout>
      <div className="story-container grid place-items-center px-4">
        <div className="wrap grid place-items-center place-content-center min-h-[600px] text-center">
          <div className="title font-extrabold text-3xl mb-4">
            ROSHE<span className="text-primary">STUDIOS</span> STORY
          </div>
          <div className="text-lg max-w-4xl font-light text-textDark leading-7">
            ROSHE<span className="text-primary">STUDIOS</span> was born from a
            passion to see design leveraged across organizations to bring better
            solutions to customers.
            <p>
              Our process is founded on the core tenets of creative problem
              solving for innovation and growth, excellence, experimentation,
              learning and last, but certainly not least - empathy.
            </p>
            <p className="mt-4">
              Stories are very powerful but when told visually, it connects with
              the audience deeply and easily We look forwards to helping brands
              tell visually compelling stories with digital content.
            </p>
          </div>
          <Button
            className="mt-10 border-primary h-70 rounded-none"
            size="large"
          >
            Let’s work together
          </Button>
        </div>
      </div>
    </InfoLayout>
  );
}

export default OurStory;
