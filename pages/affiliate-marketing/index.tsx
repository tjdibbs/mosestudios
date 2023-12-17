import React from "react";
import Image from "next/image";
import { Button } from "antd";
import InfoLayout from "@comp/info/InfoLayout";
import Link from "next/link";

function AffiliateMarketing() {
  // const user = useAppSelector((state) => state.session.user);
  // const { FormControl, handleSubmit, reset } = useFormControl<
  //   Partial<Affiliate>
  // >({});
  // const { fetcher, fetching } = useFetch();

  // const showModal = React.useCallback((referrerCode: string) => {
  //   const { destroy } = Modal.success({
  //     title: <p className="font-bold text-lg">Account Created Successfully</p>,
  //     footer: false,
  //     onCancel: () => {
  //       reset();
  //       destroy();
  //     },
  //     closable: true,
  //     closeIcon: <CloseCircle />,
  //     content: (
  //       <div className="wrap">
  //         <div className="title font-semibold mb-4">
  //           Your referral Code is -{" "}
  //           <span className="text-primary">{referrerCode}</span>
  //         </div>
  //         <div className="flex flex-col gap-3 cursor-pointer mt-4">
  //           <Link
  //             href={"/affiliate-marketing/" + referrerCode}
  //             className="block w-full"
  //           >
  //             <Button
  //               size="large"
  //               type="primary"
  //               className="text-black w-full bg-orange-400"
  //             >
  //               Go to Dashboard
  //             </Button>
  //           </Link>
  //           <Button
  //             size="large"
  //             className="border-primary/80 text-primary/80"
  //             onClick={() => copyToClipboard(referrerCode)}
  //           >
  //             Copy your referral Code
  //           </Button>
  //           <Button
  //             size="large"
  //             className="border-primary/80 text-primary/80"
  //             onClick={() =>
  //               copyToClipboard(
  //                 "https://roshestudios.com/register?referrerCode=" +
  //                   referrerCode
  //               )
  //             }
  //           >
  //             Copy your referral Link
  //           </Button>
  //         </div>
  //       </div>
  //     ),
  //   });
  // }, []);

  // const submit = React.useCallback(
  //   async (fields: any) => {
  //     const res = await fetcher<{ referrerCode: string }>({
  //       method: "post",
  //       url: config.urls.affiliate,
  //       data: fields,
  //     });

  //     if (!res.success || res.error) {
  //       return Alert.error(res.message || res.error || appealingMessage, 3);
  //     }

  //     Alert.success(res.message, 5);
  //     showModal(res.referrerCode);
  //   },
  //   [fetcher, showModal]
  // );

  return (
    <InfoLayout>
      <div className="internship-container px-4">
        <div className="page-title font-bold text-3xl sm:text-5xl mt-10 mb-6 text-center">
          AFFILIATE <span className="text-primary">MARKETING</span>
        </div>

        <div className="text-wrap">
          <div className="text-center font-light text-[#addad]">
            At ROSH<span className="text-[#f6bf02]">STUDIOS</span>, we strongly
            believe in the power of network, opportunities and collaboration.
            <br />
            Become an affiliate marketer for our Subscription based Package, and
            get commissioned for every client you bring.
            <br />
            <br />
            <span className="font-bold">How Much Will I Earn?</span> - 10% for
            the subscription package.
            {"  "}
            <br />
            <span className="font-bold">
              <br />
              Steps{" "}
            </span>
            - Create an account to get started
            <br />
            <span className="font-bold">
              <br />
              Start your journey as an affiliate marketer today! <br />
            </span>
            Terms and conditions apply.
          </div>
        </div>

        <div className="wrap flex flex-col-reverse gap-16 gap-x-[200px] my-20 items-center justify-center">
          {/* <form
            action="#"
            onSubmit={handleSubmit(submit)}
            className="bg-white px-6 w-[500px] py-8"
          >
            {FormControl({ name: "fullName", label: "Full Name" })}
            {FormControl({ name: "phone" })}
            {FormControl({ name: "email" })}
            {FormControl({ name: "address", label: "Address" })}
            {FormControl({ name: "bankName", label: "Bank Name" })}
            {FormControl({
              name: "bankAccountName",
              label: "Bank Account Name",
            })}
            {FormControl({
              name: "bankAccountNumber",
              label: "Bank Account Number",
            })}

            <div className="actions w-max mx-auto">
              <Button
                size="large"
                loading={fetching}
                disabled={fetching}
                htmlType="submit"
                className="bg-bgDark text-white rounded-none px-8"
              >
                APPLY
              </Button>
            </div>
          </form> */}

          <div className="image-wrap">
            <Image
              src={"/images/mose.gif"}
              width={500}
              height={500}
              className="max-w-full h-auto"
              alt="roshestudio logo"
            />
          </div>

          <Link href={"/register?_r=/dashboard/invites"}>
            <Button className="text-black" size="large" type="primary">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </InfoLayout>
  );
}

export default AffiliateMarketing;
