import InfoLayout from "@comp/info/InfoLayout";
import React from "react";

function MissionAndVision() {
  return (
    <InfoLayout>
      <div className="mission-and-vision">
        <div className="mission px-6 text-center bg-[#ADADAD] text-black grid place-items-center gap-4 place-content-center h-[415px]">
          <div className="title font-bold text-3xl">OUR MISSION</div>
          <div className="text">
            OUR MISSION IS TO CREATE A WORLD-CLASS VIRTUAL DIGITAL CONTENT
            STUDIO FOR A GLOBAL AUDIENCE!
          </div>
        </div>
        <div className="vision px-6 text-center text-white grid place-items-center gap-4 place-content-center h-[415px]">
          <div className="title font-bold text-3xl">OUR VISION</div>
          <div className="text">
            "OUR VISION IS TO BE ONE OF THE LEADING VIRTUAL CONTENT CREATION
            STUDIO IN THE WORLD!"
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}

export default MissionAndVision;
