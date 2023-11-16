import InfoLayout from "@comp/info/InfoLayout";
import React from "react";

function BrandCulture() {
  return (
    <InfoLayout>
      <div className="mission-and-vision">
        <div className="bg-[#ADADAD] px-6 text-black grid place-items-center gap-4 place-content-center h-[415px]">
          <div className="title font-extrabold text-3xl">OUR CULTURE</div>
          <div className="text-center max-w-3xl mx-auto">
            At ROSHESTUDIOS, we believe that our employees are important
            stakeholders. Working remotely with greater flexibility and higher
            productivity. We formulate policies that favour employees, keeping
            their productivity level high while producing world-class content.
            We can brag about the team spirit in our studio that has helped make
            the daunting task of animation easy. Simply put, MOSESTUDIOS creates
            a family bond while maintaining professionalism.
          </div>
        </div>
        <div className="text-white px-6 grid place-items-center gap-4 place-content-center h-[415px]">
          <div className="title font-extrabold text-3xl">
            PROMOTING DIVERSITY
          </div>
          <div className="text-center text-white/80 max-w-3xl mx-auto">
            We promote diversity and leverage the diverse perspectives of
            working together with people with different perspectives all around
            the world. Our diversity is reflected in cultural and social
            backgrounds, gender distribution, age distribution, talent, and
            skill level. We acknowledge that diversity causes us to get the best
            of our people, build better connections with them, provide the best
            experience for our customers and grow our business.
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}

export default BrandCulture;
