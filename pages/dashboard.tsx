"use client";

import { Affix, Button, Input, Modal, message as Alert } from "antd";
import { ArrowRight, Notification, Add } from "iconsax-react";
import React from "react";
import Image from "next/image";
import ProfileImage from "@assets/profile.png";
import UploadedContent from "@comp/protected/UploadedContent";
import { useAppDispatch, useAppSelector } from "@redux/store";
import CreateContent, { CreateContentRefObject } from "@comp/CreateContent";
import useFetch from "@hooks/useFetch";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { config } from "@lib/constants";
import { LOGIN } from "@redux/slices/sessionSlice";
import Loading from "@comp/Loading";
import ProtectedLayout from "@comp/protected/ProtectedLayout";
import dynamic from "next/dynamic";

function Dashboard() {
  const user = useAppSelector((s) => s.session.user);
  const createContentRef = React.useRef<CreateContentRefObject>(null);
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
    <ProtectedLayout>
      <div className="customer-dashboard-container">
        <div className="page-container">
          <Affix offsetTop={0}>
            <div className="header bg-bgDark p-4 flex items-center justify-between">
              <div className="welcome-text font-bold text-base sm:text-2xl">
                Welcome Back, Moses
              </div>
              <div className="search hidden sm:block">
                <Input.Search
                  size="large"
                  placeholder="Search for content"
                  classNames={{ input: "py-2.5 rounded-l-full" }}
                  className="w-96 [&_input]:border-white [&_button]:border-white [&_button]:py-2.5 [&_button]:h-auto [&_button]:w-12 [&_button]:rounded-r-full"
                />
              </div>

              <div className="flex gap-3 items-center">
                <Button
                  size="large"
                  icon={<Notification />}
                  className="border-white"
                />
                <div className="profile">
                  <div className="bg-white px-3 py-1 rounded-lg text-gray-800 flex items-center gap-3">
                    <div className="image">
                      <Image
                        src={ProfileImage}
                        className="border-full"
                        alt="profile"
                        width={40}
                        height={40}
                      />
                    </div>
                    <div className="wrap flex-1 hidden sm:block">
                      <div className="name font-bold">
                        {user?.firstName}
                        {user?.package && (
                          <span
                            className="text-black rounded-xl font-bold py-1 text-xs px-2"
                            style={{
                              backgroundColor: PackageColor[user.package],
                            }}
                          >
                            {user?.package}
                          </span>
                        )}
                      </div>
                      <div className="email text-xs text-gray-400">
                        {user?.email}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Affix>
          <div className="flex flex-wrap gap-10 mt-6 pr-3">
            <div className="wrap flex-grow">
              <div className="flex flex-wrap bg-bgDarkSecondary px-4 mb-10 py-6 rounded-xl gap-6 items-center">
                <Button
                  type="text"
                  onClickCapture={() => createContentRef.current?.open()}
                  className="w-[63px] h-[63px] gird place-items-center  bg-white rounded-full"
                  icon={<Add className="h-14 w-14" color="black" />}
                />
                <div className="flex-grow">
                  <div className="text-lg sm:text-2xl mb-2 font-bold tracking-tight">
                    New Content
                  </div>
                  <div className="text-base font-medium tracking-tight">
                    Upload content calender (PDF, EXL or Word document)
                  </div>
                </div>
                <div className="text-neutral-400 text-sm font-bold">
                  Remaining : 1
                </div>
              </div>
              <div className="flex flex-col gap-5">
                <UploadedContent />
                <UploadedContent />
                <UploadedContent />
              </div>
            </div>
            <div className="wrap w-[300px]">
              <div className="text-yellow-500 text-[11px] font-semibold">
                Upgrade Account
              </div>
              <div className="text-zinc-400 text-[28px] font-bold my-5">
                Get More Value for your Contents
              </div>

              <Button className="border-primary text-primary font-bold w-full flex justify-between items-center h-12">
                <span>Upgrade Plan</span>
                <ArrowRight size="20" />
              </Button>
            </div>
          </div>
        </div>

        <CreateContent ref={createContentRef} />
      </div>
    </ProtectedLayout>
  );
}

enum PackageColor {
  gold = "yellow",
  silver = "lightgray",
  bronze = "brown",
}

export default dynamic(async () => Dashboard, { ssr: false });
