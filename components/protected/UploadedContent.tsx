import React from "react";
import { Button, Input, Modal, message as Alert } from "antd";
import { Messages } from "iconsax-react";
import ContentImage from "@assets/content.png";
import Image from "next/image";
import Content, { Review } from "@models/contentModel";
import useFetch from "@hooks/useFetch";
import { appealingMessage, config } from "@lib/constants";
// import { useAppSelector } from "@redux/store";

function UploadedContent(props: { content: Content }) {
  const [open, setOpen] = React.useState<boolean>(false);
  const { fetcher, fetching } = useFetch();
  const [review, setReview] = React.useState<string>("");
  const [reviews, setReviews] = React.useState<Review[]>([]);

  console.log({ content: props.content });

  // const addReview = async () => {
  //   if (!review) return Alert.error("Please add review");

  //   const res = await fetcher({
  //     url: config.urls.content + `/${props.content._id}/add-review`,
  //     data: { message: review },
  //     method: "put",
  //   });

  //   if (!res.success || res.error) {
  //     return Alert.error(res.message || res.error || appealingMessage);
  //   }

  //   Alert.success("Review sent successfully");
  // };

  return (
    <div className="w-full p-5 bg-neutral-800 shadow-lg shadow-white/5 gap-4 rounded-xl">
      <div className=" flex flex-wrap gap-x-4 gap-y-6 items-center relative mb-4">
        <Image alt="content image" className="w-32 h-auto" src={ContentImage} />
        <div className="flex-col flex gap-2">
          <div className="text-white text-2xl font-black ">
            {props.content.title}
          </div>
          <div className="text-zinc-300 text-sm font-semibold max-w-lg ">
            {props.content.description}
          </div>
        </div>
      </div>
      {props.content.product && (
        <div className="items-center justify-between flex flex-wrap">
          <div className="items-center gap-3 flex">
            <Button
              size="large"
              className="font-bold text-black"
              type="primary"
            >
              Download
            </Button>
            <Button
              size="large"
              className="font-bold rounded-xl text-white bg-white/10 "
              icon={<Messages />}
              onClick={() => setOpen(true)}
              type="text"
            />

            <div className="text-zinc-400 text-xs">
              Available Corrections : 0/2
            </div>
          </div>
          <div className="flex-row flex-wrap text-sm gap-3 justify-start items-start inline-flex">
            <span>29:00</span>
            <span>Mp4</span>
            <span>250mb</span>
          </div>
        </div>
      )}

      <Modal
        onCancel={() => setOpen(!open)}
        footer={false}
        open={open}
        title={<p>Content Review</p>}
      >
        <div className="wrap mt-6 flow-root">
          <Input.TextArea
            className="border-white"
            rows={5}
            onChange={({ target }) => setReview(target.value)}
          />
          <Button type="primary" className="text-black mt-4 float-right">
            Add Review
          </Button>
          <div className="reviews mt-10">
            <div className="title font-bold text-xl mb-6">Reviews</div>
            <div className="review-list">
              {props.content.reviews.map((review) => {
                return (
                  <div className="message bg-bgDarkSecondary p-3 mb-2 rounded-lg">
                    {review.message}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default UploadedContent;
