"use client";

import ContentContainer from "@comp/protected/ContentContainer";
import Customers from "@comp/protected/Customers";
import { Select, Skeleton } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import { CreateContentRefObject } from "@comp/CreateContent";
import Loading from "../loading";
import useFetch from "@hooks/useFetch";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { config } from "@lib/constants";
import { LOGIN } from "@redux/slices/sessionSlice";

const Performance = dynamic(
  async () => await import("@comp/protected/PerformanceChart"),
  { ssr: false, loading: () => <Skeleton /> }
);

function Admin() {
  const user = useAppSelector((s) => s.session.user);
  const { fetcher } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    if (!user) {
      (async () => {
        const tk = Cookies.get("tk");

        if (!tk) return router.replace("/login?_r=/dashboard");
        const res = await fetcher<{ token: string; user: Roshestudios.User }>({
          url: config.urls.getSessionUser,
          method: "post",
          data: { token: tk },
        });

        if (!res.success || res.error)
          return router.replace("/login?_r=/dashboard");

        console.log({ res });
        dispatch(LOGIN({ user: res.user, token: tk }));
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user) return <Loading />;
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
            <Performance />
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
