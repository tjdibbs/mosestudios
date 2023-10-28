import React from "react";
import { Button } from "antd";

function UploadedContent() {
  return (
    <div className="w-full p-5 bg-neutral-800 flex items-center shadow-lg shadow-white/5 gap-4 rounded-xl">
      <div className="w-[218px] h-[139px] relative">
        <div className="w-[218px] h-[139px] bg-stone-500 rounded-[20px]"></div>
        <div className="w-[39px] h-[39px] left-[90px] top-[50px] absolute">
          <div className="w-[39px] h-[39px] bg-zinc-300 rounded-full"></div>
        </div>
      </div>
      <div className="flex-col gap-6 flex">
        <div className="flex-col flex gap-2">
          <div className="text-white text-2xl font-black ">
            Welcome back to school Animation
          </div>
          <div className="text-zinc-300 text-sm font-semibold ">
            A short animated film to welcome students back to school and inform
            new students on the various rules in the school.
          </div>
        </div>
        <div className="items-center justify-between flex">
          <div className="items-center gap-3 flex">
            <Button
              size="large"
              className="font-bold text-black"
              type="primary"
            >
              Download
            </Button>

            <div className="text-zinc-400 text-xs">
              Available Corrections : 0/2
            </div>
          </div>
          <div className="flex-col justify-start items-start gap-0.5 inline-flex">
            <div className="text-neutral-400 text-[11px] font-semibold ">
              29:00
            </div>
            <div className="text-neutral-400 text-[11px] font-semibold ">
              Mp4
            </div>
            <div className="text-neutral-400 text-[11px] font-semibold ">
              250mb
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadedContent;
