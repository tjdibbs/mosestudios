import ProtectedLayout from "@comp/protected/ProtectedLayout";
import React from "react";
import { ArrowSwapHorizontal } from "iconsax-react";
import { Button, Modal, message as Alert, Badge } from "antd";
import Cookies from "js-cookie";
import { appealingMessage, config, plans } from "@lib/constants";
import { LOGIN } from "@redux/slices/sessionSlice";
import User from "@models/userModel";
import { useAppDispatch, useAppSelector } from "@redux/store";
import useFetch from "@hooks/useFetch";
import { useRouter } from "next/router";
import { usePaystackPayment } from "react-paystack";
import { PaystackProps } from "react-paystack/dist/types";

type Plan = Roshestudios.Plan;

function Plans() {
  const user = useAppSelector((s) => s.session.user);
  const { fetcher, fetching } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [selected, setSelected] = React.useState<Plan>();
  const [open, setOpen] = React.useState(false);

  const defaultPaymentConfig: Partial<PaystackProps> = {
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
      data: { plan: selected?.plan },
    }).then((res) => {
      if (!res.success || res.error) {
        return Alert.error(res.message || res.error || appealingMessage);
      }

      dispatch(LOGIN({ user: { ...user!, plan: selected!.plan! } }));

      Alert.success("You have successfully subscribe to " + selected + " plan");
      router.replace("/dashboard");
    });
  };

  const handlePayment = (plan: (typeof plans)[0]) => {
    if (!user) return router.replace("/login?_r=/plans?selected=" + plan.plan);
    initializePayment({
      onSuccess: handleSuccessPayment,
      onClose: () => {},
      config: {
        amount: (plan!.price.naira! * 100) / 2,
        email: user?.email,
        reference: new Date().getTime().toString(),
      },
    });
  };

  const handleClick = React.useCallback(
    (plan: User["plan"]) => {
      return () => {
        router.push("?selected=" + plan, "/plans?selected=" + plan, {
          shallow: true,
        });

        if (!user) return router.replace("/login?_r=/plans?selected=" + plan);

        const planData = plans.find((p) => p.plan == plan);

        // setPaymentConfig((c) => ({
        //   ...c,
        //   email: user.email,
        //   reference: new Date().getTime().toString(),
        //   // amount: 5000,
        //   amount: (planData!.price.naira! * 100) / 2, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
        // }));

        setSelected(planData);
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
  }, [router.query.selected]);

  return (
    <ProtectedLayout>
      <div className="page-title text-4xl text-center mt-20 mb-4 font-black">
        Select You Preferred Package
      </div>
      <div className="plans flex flex-wrap justify-center gap-6 my-10 max-w-6xl mx-auto">
        {plans.map((p, index) => (
          <Badge.Ribbon
            key={index}
            rootClassName="flex-grow sm:min-w-[320px] w-[450px] max-w-full"
            text={"50% off"}
          >
            <Button
              onClickCapture={handleClick(p.plan)}
              className="h-auto bg-[#D9D9D9] text-black py-6 border border-solid border-primary shadow-primary/20 shadow-lg p-4 px-6 rounded-xl"
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
                  ${p.price.dollar / 2}
                </div>
                <ArrowSwapHorizontal size="32" />
                <div className="naira bg-bgDark text-white text-xl xs:text-3xl  font-bold px-6 py-2 rounded-lg">
                  ₦{(p.price.naira / 2).toLocaleString()}
                </div>
              </div>
              <div className="price flex items-center justify-between px-5">
                <div className="line-through">${p.price.dollar}</div>
                <div className="naira line-through">
                  ₦{p.price.naira.toLocaleString()}
                </div>
              </div>
            </Button>
          </Badge.Ribbon>
        ))}
      </div>
      {selected && (
        <Modal
          onOk={() => handlePayment(selected!)}
          onCancel={() => setSelected(undefined)}
          centered
          confirmLoading={fetching}
          okText={
            <p className="text-black">
              Make Payment - ₦{(selected?.price?.naira / 2).toLocaleString()}
            </p>
          }
          title={<p>Make payment for {selected?.plan} plan</p>}
          open={Boolean(selected)}
        >
          <div className="title font-bold text-2xl my-4">
            Buy {selected?.title}
          </div>
          <div className="description leading-6">{selected?.description}</div>
        </Modal>
      )}
    </ProtectedLayout>
  );
}

export default Plans;
