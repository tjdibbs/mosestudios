import React from "react";
import { Button, message as Alert } from "antd";
import useFormControl from "hooks/useFormControl";
import Image from "next/image";
import InfoLayout from "@comp/info/InfoLayout";
import useFetch from "@hooks/useFetch";
import { appealingMessage, config } from "@lib/constants";

function ContactUs() {
  const { FormControl, handleSubmit, reset } = useFormControl({});
  const { fetcher, fetching } = useFetch();

  const submit = React.useCallback(
    async (fields: any) => {
      const res = await fetcher({
        method: "post",
        url: config.urls.contact,
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
      <div className="contact-us-container px-4">
        <div className="flex flex-col-reverse sm:flex-row sm:gap-20 md:gap-x-[200px] justify-center my-20 items-center flex-wrap-reverse">
          <div className="wrap max-w-xl w-full flex-1">
            <div className="wrap text-center">
              <div className="page-title font-extrabold text-4xl mb-2 uppercase">
                Contact <span className="text-primary">Us</span>
              </div>
              <div className="text-light mb-8">
                Let's talk about how we can work together
              </div>
            </div>

            <form
              action="#"
              onSubmit={handleSubmit(submit)}
              className="bg-white px-6  py-8"
            >
              {FormControl({ name: "fullName", label: "Full Name" })}
              {FormControl({ name: "brandName", label: "Brand name" })}
              {FormControl({ name: "email" })}
              {FormControl({
                name: "message",
                type: "textarea",
                label: "Message",
              })}

              <div className="actions w-max mx-auto mt-10">
                <Button
                  size="large"
                  loading={fetching}
                  disabled={fetching}
                  htmlType="submit"
                  className="bg-bgDark text-white rounded-none px-8"
                >
                  SEND
                </Button>
              </div>
            </form>
          </div>
          <div className="image-wrap">
            <Image
              src={"/images/mose.gif"}
              width={500}
              height={500}
              className="max-w-full h-auto"
              alt="roshestudio logo"
            />
          </div>
        </div>
      </div>
    </InfoLayout>
  );
}

export default ContactUs;
