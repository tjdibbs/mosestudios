import React from "react";
import { Button } from "antd";

function ClientWorks() {
  return (
    <div className="client-works px-4 pb-48">
      <div className="header my-10 text-center">
        <div className="title text-3xl font-bold">
          CLIENT <span className="text-primary">WORKS</span>
        </div>
      </div>
      <div className="wrapper flex flex-wrap gap-10 justify-center">
        {works.map((work) => (
          <div key={work} className="work-wrap bg-white rounded-xl">
            <iframe
              width="560"
              height="315"
              className="rounded-xl max-w-full bg-white"
              src={"https://www.youtube-nocookie.com/embed/" + work}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      </div>

      <div className="actions w-max mx-auto mt-10">
        <Button className="h-12 mt-6 px-6 rounded-none border-primary">
          Let's Work Together
        </Button>
      </div>
    </div>
  );
}

const works = [
  "q9_02M61sq4",
  "tbQYjZgiSzY",
  "hMJdZbaYlOo",
  "dgzS7mLq2Ks",
  "QeCX6XNxb14",
  "qcstJGPVvMc",
  "_X940L2Jum4",
  "X_Tjyy5-mlo",
];

export default ClientWorks;
