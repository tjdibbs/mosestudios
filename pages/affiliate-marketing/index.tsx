import useFormControl from "hooks/useFormControl";
import React from "react";
import Image from "next/image";
import { Button, message as Alert } from "antd";
import InfoLayout from "@comp/info/InfoLayout";
import useFetch from "@hooks/useFetch";
import { appealingMessage, config } from "@lib/constants";

function AffiliateMarketing() {
  const { FormControl, handleSubmit, reset } = useFormControl({});
  const { fetcher, fetching } = useFetch();

  const submit = React.useCallback(
    async (fields: any) => {
      const res = await fetcher({
        method: "post",
        url: config.urls.affiliate,
        data: fields,
      });

      if (!res.success || res.error) {
        return Alert.error(res.message || res.error || appealingMessage, 3);
      }

      Alert.success(res.message, 5);
      reset();
    },
    [fetcher, reset]
  );
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
            - Register as an affiliate marketer to get started
            <br />
            <span className="font-bold">
              <br />
              Start your journey as an affiliate marketer today! <br />
            </span>
            Terms and conditions apply.
          </div>
        </div>

        <div className="wrap flex justify-center gap-16 gap-x-[200px] my-20 items-center flex-wrap-reverse">
          <form
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
          </form>

          <div className="image-wrap">
            <Image
              src={"/images/mose.gif"}
              width={500}
              height={500}
              alt="roshestudio logo"
            />
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}

export default AffiliateMarketing;
