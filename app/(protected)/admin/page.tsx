"use client";

import ContentContainer from "@comp/protected/ContentContainer";
import Customers from "@comp/protected/Customers";
import PerformanceChart from "@comp/protected/PerformanceChart";
import { Select } from "antd";
import React from "react";

function Admin() {
  const onBrowser = typeof window != "undefined";
  console.log({ onBrowser, w: typeof window });
  return (
    <div className="admin-container flex-1 flex gap-5 justify-between pr-2">
      <div className="wrap flex-grow">
        <div className="welcome-text font-extrabold text-3xl">
          Welcome Back, Moses
        </div>
        <div className="flex gap-4 flex-wrap mt-4">
          {subscribers.map((subscriber, index) => {
            return (
              <div
                key={index}
                className="wrap border-0 border-r border-solid border-gray-300 p-4"
              >
                <div className="title">
                  No. of {subscriber.title} Subscribers
                </div>
                <div className="count flex gap-3 my-3 items-center">
                  <div className="big text-2xl font-black">
                    {subscriber.count}
                  </div>
                  <div className="additional bg-primary text-xs text-black font-bold rounded-xl p-1 px-1.5">
                    +{subscriber.additional}
                  </div>
                </div>
                <div className="text-sm">last 7 days</div>
              </div>
            );
          })}
        </div>
        <div className="chart-container mt-10">
          <div className="chart-header">
            <div className="wrap flex items-center gap-4">
              <div className="title font-extrabold text-2xl mb-3">
                Customer Activity
              </div>
              <Select
                defaultValue={"month"}
                className="[&_.ant-select-selector]:bg-primary w-20"
                options={[
                  { value: "month", label: <p className="font-bold">Month</p> },
                  { value: "year", label: "year" },
                ]}
              />
            </div>
          </div>
          <div className="wrap text-black">
            {onBrowser && <PerformanceChart />}
          </div>
        </div>

        <Customers />
      </div>
      <aside className="py-4  w-[400px] ">
        <div className="title font-extrabold mb-4 text-2xl">
          Upcoming Contents
        </div>
        <ContentContainer />
      </aside>
    </div>
  );
}

const contents = [
  {
    name: "Ebube Mike-Nzeagwu",
    email: "ebube@powerlabstech.com",
    description:
      "Content for September -  Animation for school Find more information in PDF attached",
    createdAt: "",
    file: "",
  },
];

const PackageColors = {
  gold: "",
  silver: "",
  bronze: "",
  plantinum: "",
};

const subscribers = [
  {
    count: 500,
    title: "Gold",
    additional: 50,
  },
  {
    count: 500,
    title: "Silver",
    additional: 20,
  },
  {
    count: 500,
    title: "Bronze",
    additional: 30,
  },
  {
    count: 500,
    title: "Plantinum",
    additional: 50,
  },
];

export default Admin;
