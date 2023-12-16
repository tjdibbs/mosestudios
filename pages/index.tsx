// assets
import Codenest from "@assets/codenest.png";
import PowerLab from "@assets/powerlab.png";
import Techen from "@assets/techen.png";
import Venus from "@assets/venus.png";
import ReadySet from "@assets/ready-set.png";
import RoshePrint from "@assets/rosheprint.png";
import FindrColorCode from "@assets/FindrColorCode.png";

// Team members

import React from "react";
import { Button } from "antd";
import Image from "next/image";
import Logo from "@assets/logo.png";
import { BannerSvg } from "@comp/svgs";
import { ArrowSwapHorizontal } from "iconsax-react";
import { Pagination, EffectCoverflow } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";
import { teamMembers } from "@lib/constants";
import InfoLayout from "@comp/info/InfoLayout";
import Link from "next/link";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  const swiperRef = React.createRef<SwiperRef>();
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    videoRef.current?.play();
  }, []);

  return (
    <InfoLayout>
      <div className="home-container">
        <section className="banner relative">
          {/* <Image
          src={InfoBanner}
          className="max-h-[500px] w-full object-fill"
          alt="roshestudio banner"
          priority
        /> */}
          <video
            controls={false}
            className="w-full min-h-[350px] sm:h-[800px] object-cover brightness-[90%]"
            autoPlay
            ref={videoRef}
            loop
            muted
            src="https://res.cloudinary.com/dm7xl4bea/video/upload/v1702690032/dkfxptgwc2rhghfcsqki.mp4"
          ></video>

          <div className="content absolute w-full h-full top-0 md:top-56 left-0 grid place-items-center place-content-center">
            <div className="welcome bg-bgDark w-max max-w-full px-4 py-2 rounded-lg mb-2 mx-auto text-white flex flex-wrap gap-x-4 items-center">
              <span className="font-extrabold text-base sm:text-xl uppercase">
                Welcome to{" "}
              </span>
              <Image
                src={Logo}
                width={224}
                height={42}
                priority
                className="w-48 h-auto sm:w-auto"
                alt="roshestudio logo"
              />
            </div>
            <h1 className="text-3xl sm:text-5xl text-center font-extrabold text-primary mb-1">
              TELL YOUR BEST BRAND STORY
            </h1>
            <Link href={"/contact"}>
              <Button
                type="primary"
                size="large"
                className="text-black w-auto px-2 uppercase text-center font-bold text-xl sm:text-2xl"
              >
                Get Started
              </Button>
            </Link>
          </div>
          <BannerSvg />
        </section>
        <section className="partners-sections my-16">
          <div className="text-wrap px-4 text-center mx-auto">
            <h1 className="text-2xl sm:text-5xl mb-2 font-black">
              A VIRTUAL GLOBAL DIGITAL STUDIO
            </h1>
            <p className="text-secondary text-base sm:text-2xl text-center text-gray-400">
              Sometimes size doesn't matter. We work for big & small
              non-stoppable visionaries. There's love for them all
            </p>
          </div>

          <div className="partners flex flex-wrap gap-5 gap-y-10 items-center justify-evenly bg-[#D9D9D9] py-8  shadow-xl shadow-white/20 my-10">
            {[
              { image: Codenest, height: 30 },
              { image: PowerLab, height: 30 },
              { image: ReadySet, height: 70 },
              { image: Techen, height: 25 },
              { image: Venus, height: 40 },
              { image: FindrColorCode, height: 40 },
            ].map((item, i) => (
              <Image
                src={item.image}
                key={i}
                alt={"roshestudios partner"}
                className="h-auto sm:w-auto"
                height={item.height}
              />
            ))}
          </div>

          <div className="max-w-6xl px-4 sm:text-2xl mt-4 mx-auto text-gray-400 text-center">
            We offer innovative digital content solution like 3D animation, 2D
            animation, Product Visualization, Motion graphics, Visual effects
            and and Still Graphics to tell compelling brand stories.
          </div>
        </section>

        <section
          id="sme-social-content-plans"
          className="social-media-plans my-20 px-4"
        >
          <div className="text-wrap text-center  mx-auto">
            <div className="section-title text-2xl sm:text-5xl text-center mb-2 font-black">
              SOCIAL MEDIA PACKAGE SUBSCRIPTIONS
            </div>
            <div className="secondary-text sm:text-xl text-center mx-auto max-w-6xl text-gray-400">
              With our Social media content plans, brands can focus on other
              part of their business while we create stunning and amazing
              contents for their social handles .
            </div>
            <div className="subtitle mt-6 text-2xl sm:text-5xl font-bold">
              SUBSCRIBE TO A <span className="text-primary">PLAN</span>
            </div>
          </div>
          {/* 
          <div className="plans flex flex-wrap gap-6 my-10 max-w-6xl mx-auto">
            {plans.map((p, index) => (
              <div
                key={index}
                className="package bg-[#D9D9D9] w-[450px] text-black flex-grow min-w-[320px] max-w-full py-6 border border-solid border-primary shadow-primary/20 shadow-lg p-4 px-6 rounded-xl"
              >
                <div className="package-title text-black text-center uppercase font-extrabold text-2xl sm:text-4xl mb-2">
                  {p.title}
                </div>
                <p className="package-description text-black sm:text-xl text-center mb-2">
                  {p.description}
                </p>

                <div className="price flex items-center justify-between mt-6">
                  <div className="dollar bg-bgDark text-white text-xl xs:text-3xl font-bold px-6 py-2 rounded-lg">
                    ${p.price.dollar}
                  </div>
                  <ArrowSwapHorizontal size="32" />
                  <div className="naira bg-bgDark text-white text-xl xs:text-3xl  font-bold px-6 py-2 rounded-lg">
                    ₦{p.price.naira.toLocaleString()}
                  </div>
                </div>
              </div>
            ))} */}
          <div className="plans flex flex-wrap gap-6 my-10 max-w-6xl mx-auto">
            {plans.map((p, index) => (
              <Button
                onClickCapture={() =>
                  router.push("/register?_r=/plans?selected=" + p.plan)
                }
                key={index}
                className="h-auto bg-[#D9D9D9] w-[450px] text-black flex-grow min-w-[320px] max-w-full py-6 border border-solid border-primary shadow-primary/20 shadow-lg p-4 px-6 rounded-xl"
              >
                <div className="wrap max-w-full">
                  <div className=" text-black text-center uppercase font-extrabold text-2xl sm:text-4xl mb-2">
                    {p.title}
                  </div>
                  <div className="text-black sm:text-xl mb-2 w-full whitespace-break-spaces">
                    {p.description}
                  </div>
                </div>

                <div className="price flex items-center justify-between mt-6">
                  <div className="dollar bg-bgDark text-white text-xl xs:text-3xl font-bold px-6 py-2 rounded-lg">
                    ${p.price.dollar}
                  </div>
                  <ArrowSwapHorizontal size="32" />
                  <div className="naira bg-bgDark text-white text-xl xs:text-3xl  font-bold px-6 py-2 rounded-lg">
                    ₦{p.price.naira?.toLocaleString()}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </section>

        {/* <section className="subscribers">
        <div className="section-title text-3xl text-center mb-10 font-black">
          Join Our Subscribers
        </div>
        <div className="image-wrap">
          <Image src={Community} alt="community" className="w-full h-auto" />
        </div>
        <div className="btn-wrap w-max mx-auto my-6">
          <Button
            size="large"
            className="mx-auto border-primary rounded-none w-max"
          >
            Get more info
          </Button>
        </div>
      </section> */}

        <section className="who-we-are my-28 px-4">
          <div className="text-wrap text-center max-w-5xl mx-auto">
            <div className="section-title uppercase text-3xl sm:text-5xl text-center mb-2 font-black">
              Who We Are
            </div>
            <div className="secondary-text sm:text-xl text-gray-400">
              ROSHE<span className="text-primary">STUDIOS</span> is a global
              virtual studio. We are a team of nearly 12 experienced
              international artists across the world with creatives specialized
              in different aspects of CG production.
            </div>
          </div>

          <Swiper
            spaceBetween={0}
            className="pb-20 mt-10 mx-auto"
            effect={"coverflow"}
            ref={swiperRef}
            coverflowEffect={{
              rotate: 30,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              1400: {
                slidesPerView: 5,
              },
              1200: {
                slidesPerView: 4,
              },
              1000: {
                slidesPerView: 3,
              },
              800: {
                slidesPerView: 2,
              },
            }}
            modules={[EffectCoverflow, Pagination]}
            // loop
            centeredSlides
            pagination={{ clickable: true }}
            // onSwiper={(swiper) => console.log(swiper)}
            // onSlideChange={() => console.log("slide change")}
          >
            {teamMembers.map((member, i) => (
              <SwiperSlide
                // onClickCapture={() => {
                //   console.log({ i });
                //   swiperRef.current?.swiper.slideTo(i);
                //   // swiperRef.current!.swiper.activeIndex = i;
                // }}
                key={member.name}
                className="h-auto p-4 py-10 grid place-items-center place-content-center text-center bg-bgDarkSecondary text-white/90 rounded-xl shadow-lg"
              >
                <div className="image-wrap">
                  <Image
                    src={member.image}
                    alt={member.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                </div>
                <div className="name mt-3">{member.name}</div>
                <div className="role mb-3 text-sm text-primary capitalize">
                  {member.role}
                </div>

                {member.description}
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <section className="rosheprint">
          <div
            id="NewRootRoot"
            className="bottom-banner flex flex-col w-full bg-[url('../public/images/bottom-banner-image.jpg')]"
          >
            <div className="flex flex-row flex-wrap gap-x-10 gap-y-5 justify-around items-center py-10 bg-black/60">
              <Image
                src={RoshePrint}
                alt="rosheprint"
                className="mt-6 mb-12 w-64 h-auto sm:w-auto relative z-10"
                width={300}
              />
              <div
                id="ComingSoon"
                className="text-center text-4xl p-8 rounded-xl font-['Noto_Sans'] bg-bgDark relative z-10 font-bold text-[#f6bf02] relative"
              >
                Coming Soon!
              </div>
            </div>
          </div>
        </section>
      </div>
    </InfoLayout>
  );
}

export const plans = [
  {
    title: "BRONZE PLAN",
    plan: "bronze",
    description:
      "Get 3 E-flier design per week, 12 E-flier per month to cover your monthly social media contents",
    price: {
      dollar: 80,
      naira: 80000,
    },
  },
  {
    title: "Silver PLAN",
    plan: "silver",
    description:
      "Get 8 E-flier and 2 Motion graphic design per month to cover your monthly social media contents",
    price: {
      dollar: 200,
      naira: 200000,
    },
  },
  {
    title: "GOLD PLAN",
    plan: "gold",
    description:
      "Get 4 Motion graphics and 8 E-flier per month to cover your monthly social media contents",
    price: {
      dollar: 300,
      naira: 300000,
    },
  },
  {
    plan: "diamond",
    title: "DIAMOND PLAN",
    description:
      "Get 8 Motion graphic design and 8 E-flier per month to cover your monthly social media contents",
    price: {
      dollar: 500,
      naira: 500000,
    },
  },
];
