import React from "react";
import VisualEffectImage from "@assets/services/visual-effect.jpg";
import Image from "next/image";
import InfoLayout from "@comp/info/InfoLayout";
import { Button } from "antd";
import Link from "next/link";

function VisualEffect() {
  return (
    <InfoLayout>
      <div className="flex flex-wrap-reverse px-4 gap-10 justify-around items-center max-w-6xl mx-auto py-10">
        <div className="text-wrap max-w-lg text-center">
          <div className="title font-black text-2xl sm:text-4xl mb-3">
            VISUAL <span className="text-primary">EFFECT</span>
          </div>
          <div className="desc font-extralight my-4 text-base sm:text-2xl text-textDark">
            Hollywood heavily depends on CGI for realistic 3D animations,
            significantly advancing over the past two decades. This enhances
            immersion in blockbuster movies like the Avengers series.
          </div>
          <div className="caption text-primary text-base sm:text-xl font-bold">
            “if you can dream it, we can do it.”
          </div>
          <div className="name text-textDark mt-4">Walt Disney</div>
        </div>
        <div className="images flex-1">
          <Image
            alt="zdd-image"
            className="max-w-full h-auto rounded-2xl"
            src={VisualEffectImage}
          />
        </div>
      </div>

      <section className="bg-gray-300 py-20 px-4 sm:px-10 text-black">
        <div className="flex flex-wrap gap-10 justify-around max-w-6xl mx-auto">
          <div className="wrap max-w-xl">
            <div className="section-title font-extrabold text-2xl">
              THE PROCESS
            </div>
            <div className="font-medium my-5 text-base sm:text-lg">
              This process includes creating captivating mood boards and
              character designs to help clients visualize their vision. Here's
              an overview of the stages from idea to delivery.
            </div>

            <ul className="text-base uppercase sm:text-2xl font-bold list-inside">
              <li>Design</li>
              <li>Pre-production</li>
              <li>Production</li>
              <li>Post production</li>
              <li>Delivery</li>
            </ul>
            <Link href={"/contact"}>
              <Button
                type="primary"
                size="large"
                className="text-black my-4 font-bold"
              >
                Contact us now
              </Button>
            </Link>
          </div>
          <div className="video bg-white min-h-[300px] shadow-2xl flex-grow sm:p-3 rounded-3xl overflow-hidden ">
            <iframe
              className="w-full h-full rounded-3xl"
              height={"100%"}
              width={"100%"}
              src="https://www.youtube.com/embed/cf2zrG__tuU?si=E6p0ZAp_v-FosEd7"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>
    </InfoLayout>
  );
}

export default VisualEffect;
