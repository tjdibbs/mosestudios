import InfoLayout from "@comp/info/InfoLayout";
import { Button, Divider } from "antd";
import React from "react";
import Explainer from "@assets/services/explainer.gif";
import MotionGraphics from "@assets/services/motion-graphics.gif";
import VisualEffect from "@assets/services/visual-effect.jpg";
import Branding from "@assets/services/branding.gif";
import ThreeDAnimation from "@assets/services/3dAnimation.png";
import TwoDAnimation from "@assets/services/2dAnimation.png";
import AchitectureVisualization from "@assets/services/architecture-visualization.png";
import ProductVisualization from "@assets/services/product-visualization.png";
import Image from "next/image";

function Services() {
  return (
    <InfoLayout>
      <div className="services-container pb-[200px] px-4">
        <div className="header text-center mt-10 mb-20">
          <div className="title text-3xl font-extrabold mb-2">OUR SERVICES</div>
          <div className="text-sm">Check out our range of services below</div>
        </div>

        <Divider className="border-primary block sm:hidden" />

        <div className="services-list flex flex-col gap-10 gap-y-20 [&>*:nth-child(even)]:flex-row-reverse">
          {servicesData.map((service) => (
            <div
              className={
                "service-wrap flex flex-wrap justify-center items-center gap-12 "
              }
              key={service.id}
              id={service.id}
            >
              <div className="wrap flex justify-center items-center flex-col">
                <div className="title mb-4 text-3xl font-bold text-center ">
                  {service.title}
                </div>
                <div className="description max-w-xl text-center leading-7">
                  {service.description}
                </div>

                <Button className="h-12 mt-6 px-6 rounded-none border-primary">
                  Contact us now
                </Button>
              </div>
              <div className="image-wrap bg-white w-[450px] max-w-full rounded-xl overflow-hidden h-[300px]">
                {service.image && (
                  <Image
                    src={service.image}
                    className="w-full h-full object-cover"
                    alt={service.id}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </InfoLayout>
  );
}

const servicesData = [
  {
    id: "3d-animation",
    image: ThreeDAnimation,
    title: (
      <p>
        3D <span className="text-primary">ANIMATION</span>
      </p>
    ),
    description:
      "We provide 3D Animation for movies, TV shows, commercials, or games.",
  },
  {
    id: "2d-animation",
    image: TwoDAnimation,
    title: (
      <p>
        2D <span className="text-primary">ANIMATION</span>
      </p>
    ),
    description:
      "Let us help you create your 2D animation video for your campaigns, jingles, adverts music videos and more. ",
  },
  {
    id: "architectural-visualization",
    image: AchitectureVisualization,
    title: (
      <p>
        ARCHITECTURAL <span className="text-primary">VISUALIZATION</span>
      </p>
    ),
    description:
      "Visually communicate your proposed design and beautifully tell your story with realistic element and walkthrough details. ",
  },
  {
    id: "product-visualization",
    image: ProductVisualization,
    title: (
      <p>
        PRODUCT <span className="text-primary">VISUALIZATION</span>
      </p>
    ),
    description:
      "Do you want to bring those product to life online with high quality 3D imagery that accurately display your product ?",
  },
  {
    id: "motion-graphics",
    image: MotionGraphics,
    title: (
      <p>
        MOTION <span className="text-primary">GRAPHICS</span>
      </p>
    ),
    description:
      "Do you want to bring those product to life online with high quality 3D imagery that accurately display your product ?",
  },
  {
    id: "explainer-video",
    image: Explainer,
    title: (
      <p>
        EXPLAINER <span className="text-primary">VIDEO</span>
      </p>
    ),
    description:
      "Do you want to create short online marketing videos to explain your company’s product or illustrate complex ideas ?",
  },
  {
    id: "branding",
    image: Branding,
    title: (
      <p>
        BRAND<span className="text-primary">ING</span>
      </p>
    ),
    description:
      "Do you want to create strong and positive perception of your company, it’s product or services in customer’s mind? ",
  },
  {
    id: "visual-effect",
    image: VisualEffect,
    title: (
      <p>
        VISUAL <span className="text-primary">EFFECT</span>
      </p>
    ),
    description:
      "Do you want to create VFX for films, TV or Commercials? Set extension, Matte painting, Roto, Cleanups and more ? ",
  },
];

export default Services;
