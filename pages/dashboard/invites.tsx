import Affiliate from "@models/affiliateModel";
import {
  Button,
  Divider,
  Modal,
  Radio,
  Tooltip,
  message as Alert,
  ConfigProvider,
  Empty,
} from "antd";
import React from "react";
import ProtectedLayout from "@comp/protected/ProtectedLayout";
import ContentContainer from "@comp/protected/ContentContainer";
import Cookies from "js-cookie";
import { config } from "@lib/constants";
import { AddBank, LOGIN } from "@redux/slices/sessionSlice";
import Loading from "@comp/Loading";
import { useAppSelector, useAppDispatch } from "@redux/store";
import useFetch from "@hooks/useFetch";
import { useRouter } from "next/router";
import useFormControl from "@hooks/useFormControl";
import Header from "@comp/protected/EHeader";
import { formatCurrencyUK } from "helpers";

function ReferrerDashboard() {
  const user = useAppSelector((s) => s.session.user!);
  const { fetcher, fetching } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [open, setOpen] = React.useState<boolean>(false);
  const [openAdd, setOpenAdd] = React.useState<boolean>(false);
  const [selectedBank, setSelectedBank] = React.useState<string>("");
  const { FormControl, handleSubmit, watch } = useFormControl<
    Affiliate["banks"][0]
  >({});

  const referrer = user?.affiliate;

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const saveBank = React.useCallback(
    async (bank: Affiliate["banks"][0]) => {
      await fetcher({
        method: "post",
        url: "/users/add-bank",
        data: {
          bank,
          userId: user._id,
        },
      });

      dispatch(AddBank(bank));

      setOpenAdd(false);
    },
    [dispatch, fetcher, user?._id]
  );

  const withdraw = React.useCallback(async () => {
    const bank = user.affiliate.banks.find(
      (bank) => String(bank.accountNumber) == selectedBank
    )!;

    // const res = await fetcher({
    //   url: "/users/withdraw",
    //   data: {
    //     bank,
    //     userId: user._id,
    //   },
    // });

    Alert.error("You must have up to ₦1000 available to withdraw");
  }, [selectedBank, user?.affiliate?.banks]);

  if (!user) return <Loading />;

  const clicksEarnings = referrer?.registeredRefers.total * 20;
  const subscribeEarnings = referrer?.subscribedRefers?.total;

  return (
    <ProtectedLayout>
      <div className="invites-container flex-1">
        <Header user={user} />
        <div className="referrer-dashboard sm:grid grid-cols-6 mt-10 gap-5">
          <div className="wrap col-span-4 mb-10">
            <div className="p-6 rounded-xl shadow-xl border border-solid border-gray-500">
              <div className="title font-bold text-2xl">Analytics</div>
              <Divider className="border-gray-500" />

              <div className="registeredRefer bg-bgDarkSecondary p-4 mt-6 rounded-xl shadow-sm shadow-white/xl">
                <div className="title font-bold text-xl mb-4 flex flex-wrap items-center gap-2">
                  <span>Registered Refers</span>
                  <Tooltip
                    overlayClassName="text-black"
                    title={<p className="text-black">Percentage</p>}
                  >
                    <div className="total-refers border border-solid border-primary text-primary text-sm px-1 py-px rounded-xl">
                    £1 per 500 Clicks
                    </div>
                  </Tooltip>
                </div>

                <div className="flex gap-5 flex-wrap justify-between">
                  <div className="wrap">
                    <div className="label text-primary mb-2">Total</div>
                    <div className="count font-bold text-2xl text-center">
                      {referrer?.registeredRefers.total}
                    </div>
                  </div>
                  <Divider type="vertical" className="border-gray-500" />
                  <div className="wrap">
                    <div className="label text-primary mb-2">Paid</div>
                    <div className="count font-bold text-2xl text-center">
                      {referrer?.registeredRefers.paid}
                    </div>
                  </div>
                  <Divider type="vertical" className="border-gray-500" />
                  <div className="wrap">
                    <div className="label text-primary mb-2">Unpaid</div>
                    <div className="count font-bold text-2xl text-center">
                      {referrer?.registeredRefers.unpaid}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-10">
                  <div className="total">
                    <div className="title text-green-100">Total Earnings</div>
                    <span className="count">
                      {formatCurrencyUK(subscribeEarnings)}
                    </span>
                  </div>
                  <div className="total">
                    <div className="title text-red-100">Withdraw</div>
                    <span className="count">{formatCurrencyUK(0)}</span>
                  </div>
                  <div className="available-to-withdraw">
                    <div className="title text-primary">
                      Available To Withdraw
                    </div>
                    <span className="count">{formatCurrencyUK(0)}</span>
                  </div>
                </div>
              </div>

              <div className="subscribed-refers bg-bgDarkSecondary  p-4 mt-6 rounded-xl shadow-sm shadow-white">
                <div className="title font-bold text-xl mb-4 flex flex-wrap items-center gap-2">
                  <span>Subscribed Refers</span>
                  <Tooltip title={<p className="text-black">Percentage</p>}>
                    <div className="total-refers border border-solid border-primary text-primary text-sm px-1 py-px rounded-xl">
                      10% of subscribed package
                    </div>
                  </Tooltip>
                </div>

                <div className="flex gap-5 flex-wrap justify-between">
                  <div className="wrap">
                    <div className="label text-primary mb-2">Total</div>
                    <div className="count font-bold text-2xl text-center">
                      {referrer?.subscribedRefers.total}
                    </div>
                  </div>
                  <Divider type="vertical" className="border-gray-500" />
                  <div className="wrap">
                    <div className="label text-primary mb-2">Paid</div>
                    <div className="count font-bold text-2xl text-center">
                      {referrer?.subscribedRefers.paid}
                    </div>
                  </div>
                  <Divider type="vertical" className="border-gray-500" />
                  <div className="wrap">
                    <div className="label text-primary mb-2">Unpaid</div>
                    <div className="count font-bold text-2xl text-center">
                      {referrer?.subscribedRefers.unpaid}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-6 mt-10">
                  <div className="total">
                    <div className="title text-green-100">Total Earnings</div>
                    <span className="count">
                      {formatCurrencyUK(subscribeEarnings)}
                    </span>
                  </div>
                  <div className="total">
                    <div className="title text-red-100">Withdraw</div>
                    <span className="count">{formatCurrencyUK(0)}</span>
                  </div>
                  <div className="available-to-withdraw">
                    <div className="title text-primary">
                      Available To Withdraw
                    </div>
                    <span className="count">{formatCurrencyUK(0)}</span>
                  </div>
                </div>
              </div>

              {/* <div className="flex justify-end mt-6">
                <Button
                  size="large"
                  type="primary"
                  onClick={() => setOpen(true)}
                  className="text-black font-bold"
                >
                  Withdraw
                </Button>
              </div> */}
            </div>
          </div>
          <div className="wrap col-span-2 bg-bgDarkSecondary rounded-xl p-4">
            <div className="title font-bold text-2xl">Earnings</div>
            <Divider />
            <ContentContainer />
          </div>
        </div>
      </div>

      <Modal
        centered
        onCancel={() => setOpen(false)}
        okText={<p className="text-black">Withdraw</p>}
        title={<p className="font-bold text-lg">Withdraw</p>}
        open={open}
        onOk={withdraw}
        confirmLoading={fetching}
      >
        <div className="banks my-10">
          <div className="flex justify-between items-center mb-10">
            <div className="font-bold">Select Bank</div>
            <Button
              type="primary"
              size="small"
              className=" text-black"
              onClickCapture={() => setOpenAdd(true)}
            >
              Add New
            </Button>
          </div>

          <div className="banks-list">
            <Radio.Group
              buttonStyle="solid"
              className="max-w-full overflow-hidden [&>.ant-radio-wrapper]:max-w-full [&>.ant-radio-wrapper]:mb-4 [&>.ant-radio-wrapper>_span:last-child]:max-w-[100%] [&>.ant-radio-wrapper>_span:last-child]:whitespace-nowrap [&>.ant-radio-wrapper>_span:last-child]:text-ellipsis [&>.ant-radio-wrapper>_span:last-child]:overflow-hidden [&_.ant-radio-inner]:border-gray-300"
              options={referrer.banks.map((bank) => ({
                label: `${bank.accountNumber} - ${bank.bankName} - ${bank.accountName}`,
                value: bank.accountNumber,
              }))}
            />

            {!referrer.banks.length && <Empty description="Add Bank" />}
          </div>
        </div>

        <Modal
          okText={<span className="text-black">Save Bank</span>}
          title="Add Bank"
          onCancel={() => setOpenAdd(false)}
          open={openAdd}
          onOk={handleSubmit(saveBank)}
          confirmLoading={fetching}
        >
          <Divider className="border-gray-600" />
          {FormControl({ name: "accountName", theme: "dark" })}
          {FormControl({ name: "accountNumber", theme: "dark" })}
          {FormControl({ name: "bankName", theme: "dark" })}
        </Modal>
      </Modal>
    </ProtectedLayout>
  );
}

export default ReferrerDashboard;
