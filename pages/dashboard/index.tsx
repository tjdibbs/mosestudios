"use client";

import { Button, message as Alert, Skeleton } from "antd";
import { ArrowRight, Add } from "iconsax-react";
import React from "react";
import UploadedContent from "@comp/protected/UploadedContent";
import { useAppDispatch, useAppSelector } from "@redux/store";
import CreateContent, { CreateContentRefObject } from "@comp/CreateContent";
import useFetch from "@hooks/useFetch";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { appealingMessage, config } from "@lib/constants";
import { LOGIN } from "@redux/slices/sessionSlice";
import Loading from "@comp/Loading";
import ProtectedLayout from "@comp/protected/ProtectedLayout";
import dynamic from "next/dynamic";
import Content from "@models/contentModel";
import Header from "@comp/protected/EHeader";

function Dashboard() {
  const user = useAppSelector((s) => s.session.user);
  const createContentRef = React.useRef<CreateContentRefObject>(null);
  const { fetcher, fetching } = useFetch(true);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [contents, setContents] = React.useState<Content[]>([]);

  const getContents = React.useCallback(async () => {
    const res = await fetcher<{ contents: Content[] }>({
      url: config.urls.content + "/user/" + user?._id,
    });

    if (!res.success || res.error) {
      return Alert.error(res.message || appealingMessage);
    }

    setContents(res.contents);
  }, [fetcher, user?._id]);

  React.useEffect(() => {
    if (!user) {
      (async () => {
        const tk = Cookies.get("tk");

        if (!tk) return router.replace("/login?_r=/dashboard");
        const res = await fetcher<{ token: string; user: typeof user }>({
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

    if (user) getContents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  if (!user) return <Loading />;

  return (
    <ProtectedLayout>
      <div className="customer-dashboard-container">
        <div className="page-container">
          <Header search user={user} />
          <div className="flex flex-wrap gap-10 mt-6 pr-3">
            <div className="wrap flex-1">
              {user.plan ? (
                <div className="wrap">
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
                    {fetching &&
                      Array.from(new Array(6)).map((_, i) => (
                        <div
                          key={i}
                          className="wrap p-4 bg-bgDarkSecondary rounded-xl"
                        >
                          <Skeleton />
                        </div>
                      ))}
                    {contents.map((content, index) => {
                      return <UploadedContent key={index} content={content} />;
                    })}
                  </div>
                </div>
              ) : (
                <div className="wrap grid place-items-center place-content-center h-96">
                  <div className="text-xl text-center mb-6">
                    Subscribe to a plan
                  </div>
                  <Button
                    onClick={() => router.push("/plans")}
                    className="border-primary text-primary font-bold w-full flex justify-between items-center h-12"
                  >
                    <span className="mr-4">Subscribe A Plan</span>
                    <ArrowRight size="20" />
                  </Button>
                </div>
              )}
            </div>
            {user?.plan != "diamond" && (
              <div className="wrap w-[300px] bg-bgDarkSecondary p-6 rounded-xl">
                <div className="text-yellow-500 text-xs font-semibold">
                  {user?.plan ? "Upgrade Account" : "Subscribe A Plan"}
                </div>
                <div className="text-zinc-400 text-[28px] font-bold my-5">
                  Get More Value for your Contents
                </div>

                <Button
                  onClick={() => router.push("/plans")}
                  className="border-primary text-primary font-bold w-full flex justify-between items-center h-12"
                >
                  <span>
                    {" "}
                    {user?.plan ? "Upgrade Account" : "Subscribe A Plan"}
                  </span>
                  <ArrowRight size="20" />
                </Button>
              </div>
            )}
          </div>
        </div>

        <CreateContent setContents={setContents} ref={createContentRef} />
      </div>
    </ProtectedLayout>
  );
}

export default dynamic(async () => Dashboard, { ssr: false });
