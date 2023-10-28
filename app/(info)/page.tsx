"use client";

// assets
import Codenest from "@assets/codenest.png";
import PowerLab from "@assets/powerlab.png";
import Techen from "@assets/techen.png";
import Venus from "@assets/venus.png";
import ReadySet from "@assets/ready-set.png";
import RoshePrint from "@assets/rosheprint.png";

// Team members

import React from "react";
import { Button, Typography } from "antd";
import Image from "next/image";
import InfoBanner from "@assets/info-banner.jpeg";
import Logo from "@assets/logo.png";
import { BannerSvg } from "@comp/svgs";
import { ArrowSwapHorizontal } from "iconsax-react";
import { Pagination, EffectCoverflow, FreeMode } from "swiper/modules";
import { Swiper, SwiperRef, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import teamMembers from "./teamMembers";

export default function HomePage() {
  const swiperRef = React.createRef<SwiperRef>();

  return (
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
          className="w-full h-[800px] object-fill brightness-[40%]"
          autoPlay
          loop
          muted
          src="./homepage-video.mp4"
        ></video>

        <div className="content absolute w-full h-full top-0 left-0 grid place-items-center place-content-center">
          <div className="welcome bg-bgDark w-max px-4 py-2 rounded-lg mb-4 mx-auto text-white flex gap-x-4 items-center">
            <span>Welcome to </span>
            <Image
              src={Logo}
              width={188}
              height={32}
              priority
              alt="roshestudio logo"
            />
          </div>
          <Typography.Title rootClassName="text-5xl font-extrabold text-primary">
            TELL YOUR BEST BRAND STORY
          </Typography.Title>
          <Button
            type="primary"
            size="large"
            className="text-black h-12 w-48 font-bold text-lg"
          >
            Get Started
          </Button>
        </div>
        <BannerSvg />
      </section>
      <section className="partners-sections my-16">
        <div className="text-wrap text-center max-w-2xl mx-auto">
          <h1 className="text-3xl mb-2 font-bold">
            A VIRTUAL GLOBAL DIGITAL STUDIO
          </h1>
          <p className="text-secondary capitalize text-gray-500">
            sometimes size doesn't matter. we work for big & small non-stoppable
            visionaries. there's love for them all
          </p>
        </div>

        <div className="partners flex items-center justify-evenly bg-[#D9D9D9] py-8 rounded-xl shadow-xl shadow-white/20 my-10">
          {[Codenest, PowerLab, ReadySet, Techen, Venus].map((img, i) => (
            <Image
              src={img}
              key={i}
              alt={"roshestudios partner"}
              height={i == 2 ? 70 : 40}
            />
          ))}
        </div>

        <div className="text-sm max-w-2xl mt-4 mx-auto text-gray-400 text-center">
          We offer innovative digital content solution like 3D animation, 2D
          animation, Product Visualization, Motion graphics, Visual effects and
          and Still Graphics to tell compelling brand stories.
        </div>
      </section>

      <section className="social-media-packages my-40">
        <div className="text-wrap text-center max-w-2xl mx-auto">
          <div className="section-title text-3xl text-center mb-2 font-black">
            SOCIAL MEDIA PACKAGE SUBSCRIPTIONS
          </div>
          <div className="secondary-text text-sm text-gray-400">
            With our Social media content packages, brands can focus on other
            part of their business while we create stunning and amazing contents
            for their social handles .
          </div>
          <div className="subtitle mt-4 text-2xl font-bold">
            SUBSCRIBE TO A <span className="text-primary">PLAN</span>
          </div>
        </div>

        <div className="packages flex flex-wrap gap-6 my-10 max-w-7xl mx-auto">
          {packages.map((p) => (
            <div className="package bg-[#D9D9D9] text-black flex-grow min-w-[320px] max-w-sm py-6 w-[300px] border border-solid border-primary shadow-primary/20 shadow-lg p-4 rounded-xl">
              <div className="package-title text-black text-center uppercase font-extrabold text-2xl mb-2">
                {p.title}
              </div>
              <p className="package-description text-sm text-black text-center mb-2">
                {p.description}
              </p>

              <div className="price flex justify-between mt-6">
                <div className="dollar bg-bgDark text-white text-xl font-bold px-6 py-2 rounded-lg">
                  {p.price.dollar}
                </div>
                <ArrowSwapHorizontal size="32" />
                <div className="naira bg-bgDark text-white text-xl  font-bold px-6 py-2 rounded-lg">
                  {p.price.naira}
                </div>
              </div>
            </div>
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

      <section className="who-we-are my-28">
        <div className="text-wrap text-center max-w-2xl mx-auto">
          <div className="section-title text-3xl text-center mb-2 font-black">
            Who We Are
          </div>
          <div className="secondary-text text-sm text-gray-400">
            ROSHESTUDIOS is a global virtual studio. We are a team of nearly 12
            experienced international artists across the world with creatives
            specialized in different aspects of CG production.
          </div>
        </div>

        <Swiper
          spaceBetween={0}
          slidesPerView={3}
          className="pb-20 mt-10 max-w-5xl mx-auto"
          effect={"coverflow"}
          ref={swiperRef}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Pagination]}
          loop
          pagination={{ clickable: true }}
          onSwiper={(swiper) => console.log(swiper)}
          onSlideChange={() => console.log("slide change")}
        >
          {teamMembers.map((member, i) => (
            <SwiperSlide
              onClickCapture={() => {
                console.log({ i });
                swiperRef.current?.swiper.slideTo(i);
                swiperRef.current!.swiper.activeIndex = i;
              }}
              key={member.name}
              className="h-auto p-4 grid place-items-center place-content-center text-center bg-[#D9D9D9] text-black rounded-xl shadow-lg"
            >
              <div className="image-wrap">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="rounded-full"
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
          className="flex flex-col w-full bg-[url('../public/images/bottom-banner-image.jpg')]"
        >
          <div className="flex flex-row justify-around items-center py-10 bg-black/60">
            <Image
              src={RoshePrint}
              alt="rosheprint"
              className="mt-6 mb-12"
              width={300}
            />
            <div
              id="ComingSoon"
              className="text-center text-4xl p-8 rounded-xl font-['Noto_Sans'] bg-bgDark font-bold text-[#f6bf02] relative"
            >
              Coming Soon!
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const packages = [
  {
    title: "BRONZE PLAN",
    description:
      "Get 3 E-flier design per week, 12 E-flier per month to cover your monthly social media contents",
    price: {
      dollar: "$80",
      naira: "₦80,000",
    },
  },
  {
    title: "Silver PLAN",
    description:
      "Get 8 E-flier and 2 Motion graphic design per month to cover your monthly social media contents",
    price: {
      dollar: "$200",
      naira: "₦200,000",
    },
  },
  {
    title: "GOLD PLAN",
    description:
      "Get 4 Motion graphics and 8 E-flier per month to cover your monthly social media contents",
    price: {
      dollar: "$300",
      naira: "₦300,000",
    },
  },
  {
    title: "DIAMOND PLAN",
    description:
      "Get 8 Motion graphic design and 8 E-flier per month to cover your monthly social media contents",
    price: {
      dollar: "$500",
      naira: "₦500,000",
    },
  },
];
