import ProtectedLayout from "@comp/protected/ProtectedLayout";
import React from "react";
import { ArrowSwapHorizontal } from "iconsax-react";
import { plans } from "pages";
import { Button, Modal, message as Alert } from "antd";
import Cookies from "js-cookie";
import { appealingMessage, config } from "@lib/constants";
import { LOGIN } from "@redux/slices/sessionSlice";
import User from "@models/userModel";
import { useAppDispatch, useAppSelector } from "@redux/store";
import useFetch from "@hooks/useFetch";
import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";

function Plans() {
  const user = useAppSelector((s) => s.session.user);
  const { fetcher, fetching } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = React.useState<User["plan"] | undefined>();

  const defaultPaymentConfig: Partial<PaystackProps> = {
    email: user?.email,
    firstname: user?.firstName,
    lastname: user?.lastName,
    currency: "NGN",
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
  };

  const [paymentConfig, setPaymentConfig] =
    React.useState<Partial<PaystackProps>>(defaultPaymentConfig);

  // @ts-ignore
  const initializePayment = usePaystackPayment(paymentConfig);

  const handleSuccessPayment = (...args: any[]) => {
    console.log({ args });
    fetcher({
      url: config.urls.getUser + "/" + user?._id,
      method: "patch",
      data: { plan: selected },
    }).then((res) => {
      if (!res.success || res.error) {
        return Alert.error(res.message || res.error || appealingMessage);
      }

      dispatch(LOGIN({ user: { ...user!, plan: selected! } }));

      Alert.success("You have successfully subscribe to " + selected + " plan");
      router.replace("/dashboard");
    });
  };

  const handlePayment = (plan: User["plan"]) => {
    if (!user) return router.replace("/login?_r=/plans?selected=" + plan);
    initializePayment(handleSuccessPayment, console.log);
  };

  const handleClick = React.useCallback(
    (plan: User["plan"]) => {
      return () => {
        router.push("?selected=" + plan, "/plans?selected=" + plan, {
          shallow: true,
        });

        console.log({ handlingClick: true });
        if (!user) return router.replace("/login?_r=/plans?selected=" + plan);

        const planData = plans.find((p) => p.plan == plan);

        setPaymentConfig((c) => ({
          ...c,
          email: user.email,
          reference: new Date().getTime().toString(),
          // amount: 5000,
          amount: planData!.price.naira! * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        }));

        setSelected(plan);
      };
    },
    [router, user]
  );

  React.useEffect(() => {
    if (!user) {
      (async () => {
        const tk = Cookies.get("tk");

        if (!tk) return;

        const res = await fetcher<{ token: string; user: typeof user }>({
          url: config.urls.getSessionUser,
          method: "post",
          data: { token: tk },
        });

        if (res.success) {
          dispatch(LOGIN({ user: res.user, token: tk }));
        }
      })();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  React.useEffect(() => {
    if (router.query.selected) {
      handleClick(router.query.selected as User["plan"])();
    }
  }, [handleClick, router.query.selected]);

  const selectedData = plans.find((p) => p.plan == selected);
  return (
    <ProtectedLayout>
      <div className="plans flex flex-wrap gap-6 my-10 max-w-6xl mx-auto">
        {plans.map((p, index) => (
          <Button
            onClickCapture={handleClick(p.plan as User["plan"])}
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
      <Modal
        onOk={() => handlePayment(selected!)}
        onCancel={() => setSelected(undefined)}
        confirmLoading={fetching}
        okText={
          <p className="text-black">
            Make Payment - ₦{selectedData?.price.naira.toLocaleString()}
          </p>
        }
        title={<p>Make payment for {selected} plan</p>}
        open={Boolean(selected)}
      >
        <div className="title font-bold text-2xl my-4">
          Buy {selectedData?.title}
        </div>
        <div className="description leading-6">{selectedData?.description}</div>
      </Modal>
    </ProtectedLayout>
  );
}

export default Plans;
