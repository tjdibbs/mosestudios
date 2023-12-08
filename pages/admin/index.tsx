import ContentContainer from "@comp/protected/ContentContainer";
import Customers from "@comp/protected/Customers";
import { message as Alert, Select, Skeleton, Dropdown, MenuProps } from "antd";
import dynamic from "next/dynamic";
import React from "react";
import { useAppDispatch, useAppSelector } from "@redux/store";
import useFetch from "@hooks/useFetch";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { config } from "@lib/constants";
import { LOGIN } from "@redux/slices/sessionSlice";
import Loading from "@comp/Loading";
import ProtectedLayout from "@comp/protected/ProtectedLayout";
import User from "@models/userModel";
import Image from "next/image";
import ProfileImage from "@assets/profile.png";
import Link from "next/link";

const Performance = dynamic(
  async () => await import("@comp/protected/PerformanceChart"),
  { ssr: false, loading: () => <Skeleton /> }
);

type AggregateType = {
  counts: {
    diamond: number;
    gold: number;
    silver: number;
    bronze: number;
  };
};

function Admin() {
  const user = useAppSelector((s) => s.session.user);
  const { fetcher, fetching } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [aggregate, setAggregate] = React.useState<AggregateType>();

  const getAggregate = React.useCallback(async () => {
    const res = await fetcher<{ aggregate: AggregateType }>({
      url: config.urls.getUser + "/aggregate",
    });

    if (!res.success || res.error) {
      return Alert.error("Unable to fetch aggregates");
    }

    setAggregate(res.aggregate);
  }, [fetcher]);

  React.useEffect(() => {
    if (!user) {
      (async () => {
        const tk = Cookies.get("tk");

        if (!tk) return router.replace("/login?_r=/admin");
        const res = await fetcher<{ token: string; user: User }>({
          url: config.urls.getSessionUser,
          method: "post",
          data: { token: tk },
        });

        if (!res.success || res.error)
          return router.replace("/login?_r=/admin");

        dispatch(LOGIN({ user: res.user, token: tk }));
      })();
    }

    if (user) getAggregate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <Loading />;
  return (
    <ProtectedLayout>
      <div className="admin-container w-full overflow-x-hidden overflow-hidden md:pr-2">
        <div className="flex items-center justify-between w-full">
          <div className="welcome-text font-extrabold text-xl sm:text-3xl">
            Welcome Back, Moses
          </div>
          <div className="profile">
            <Dropdown
              menu={{
                items: menuItems(user! ?? {}),

                className:
                  "shadow-2xl rounded-xl overflow-hidden px-2 pb-6 border border-solid border-gray-300",
              }}
              trigger={["click"]}
              arrow
              rootClassName="[&_.ant-dropdown-arrow]:after:border [&_.ant-dropdown-arrow]:after:border-solid [&_.ant-dropdown-arrow]:after:content-['']"
            >
              <Image
                src={ProfileImage}
                alt="profile image"
                className="cursor-pointer rounded-full w-10 h-10 shadow-lg"
              />
            </Dropdown>
          </div>
        </div>
        <div className="wrap xl:flex xl:justify-between overflow-auto">
          <div className="wrap flex-grow max-w-4xl">
            <div className="wrap w-full overflow-auto">
              <div className="flex flex-nowrap gap-4 mt-4 overflow-auto w-full px-4">
                {fetching
                  ? Array.from(new Array(4)).map((_, i) => (
                      <div
                        key={i}
                        className="wrap flex-1 mb-4 p-4 bg-bgDarkSecondary rounded-xl"
                      >
                        <Skeleton />
                      </div>
                    ))
                  : subscribers.map((plan, index) => {
                      return (
                        <div
                          key={index}
                          className="wrap border-0 min-w-max border-r border-solid border-gray-300 p-4"
                        >
                          <div className="title capitalize font-bold">
                            {plan} Subscribers
                          </div>
                          <div className="count flex gap-3 my-3 items-center">
                            <div className="big text-2xl font-black">
                              {/* @ts-ignore */}
                              {aggregate?.counts[plan] || 0}
                            </div>
                            <div className="additional bg-primary text-xs text-black font-bold rounded-xl p-1 px-1.5">
                              {/* @ts-ignore */}
                              {"+" + (aggregate?.counts[plan] || 0)}
                            </div>
                          </div>
                          <div className="text-sm">last 7 days</div>
                        </div>
                      );
                    })}
              </div>
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
                      {
                        value: "month",
                        label: <p className="font-bold">Month</p>,
                      },
                      { value: "year", label: "year" },
                    ]}
                  />
                </div>
              </div>
              <div className="wrap text-black">
                <Performance />
              </div>
              2
            </div>
            <Customers />
          </div>
          <aside className="py-4 mt-10 xl:mt-0 flex-1 xl:w-[400px] xl:h-screen overflow-hidden">
            <div className="title font-extrabold mb-4 text-2xl">
              Upcoming Contents
            </div>
            <ContentContainer />
          </aside>
        </div>
      </div>
    </ProtectedLayout>
  );
}

const menuItems = (user: User): MenuProps["items"] => [
  {
    label: (
      <div className="profile-wrapper">
        <div className="wrap flex items-start gap-x-2 pt-3">
          <Image
            src={ProfileImage}
            alt="profile image"
            className=" rounded-full w-10 h-10 shadow-lg"
          />

          <div className="detail">
            <div className="full-name capitalize font-semibold text-gray-200">
              {user.firstName} {user.lastName}
            </div>
            <p className="email text-sm text-gray-300">{user.email}</p>
          </div>
        </div>
      </div>
    ),
    type: "group",
    key: "profile-wrap",
    className: "mb-4",
  },
  {
    label: (
      <Link
        replace
        href={"/login"}
        onClick={() => {
          Cookies.remove("tk");
        }}
      >
        Logout
      </Link>
    ),
    key: "login",
  },
];

const subscribers = ["diamond", "gold", "silver", "bronze"];

export default Admin;
