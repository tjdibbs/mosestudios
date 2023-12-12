import Affiliate from "@models/affiliateModel";
import { Affiliates } from "@models/index";
import {
  Avatar,
  Button,
  Divider,
  Popover,
  Tag,
  Tooltip,
  message as Alert,
} from "antd";
import { Copy } from "iconsax-react";
import { GetServerSideProps } from "next";
import React from "react";
import stringToColor from "../../lib/stringToColor";
import copyToClipboard from "@lib/copyToClipboard";
import dbConnect from "@lib/dbConnect";

interface ReferrerDashboardProps {
  referrer: Affiliate;
}

function ReferrerDashboard(props: ReferrerDashboardProps) {
  const referrer = props.referrer;

  return (
    <div className="referrer-dashboard h-screen w-screen sm:grid place-items-center">
      <div className="bg-bgDarkSecondary p-6 rounded-xl shadow-xl border border-solid border-gray-500">
        <div className="title font-bold text-2xl">Analytics</div>
        <Divider className="border-gray-500" />
        <div className="flex gap-3">
          <Avatar
            style={{ background: stringToColor(referrer.fullName) }}
            size={60}
          >
            {referrer.fullName.at(0)}
          </Avatar>
          <div className="detail-wrap flex-1">
            <div className="full-name font-bold text-xl mb-4 flex items-center gap-3">
              <span>{referrer.fullName}</span>
              <Tooltip title="Total Refers">
                <div className="total-refers border border-solid border-primary text-primary font-bold px-1 rounded-xl">
                  {referrer.totalRefers}
                </div>
              </Tooltip>
            </div>
            <div className="flex items-center flex-wrap gap-3">
              <Popover
                arrow
                className="cursor-pointer"
                content={
                  <div className="flex flex-col gap-3 cursor-pointer">
                    <Button
                      size="small"
                      onClick={() => copyToClipboard(referrer.referrerCode)}
                    >
                      Copy Code
                    </Button>
                    <Button
                      size="small"
                      onClick={() =>
                        copyToClipboard(
                          "https://roshestudios.com/register?referrerCode=" +
                            referrer.referrerCode
                        )
                      }
                    >
                      Copy Link
                    </Button>
                  </div>
                }
              >
                <Tag
                  className="text-base flex items-center border-primary text-primary p-1 gap-2 rounded-xl px-4"
                  color="transparent"
                >
                  <span>{referrer.referrerCode}</span>
                  <Copy />
                </Tag>
              </Popover>
              <Tag className="text-gray-200 border-gray-300 p-1 gap-2 rounded-xl px-2 text-base">
                {referrer.email}
              </Tag>
              <Tag className="text-gray-200 text-base border-gray-300 p-1 gap-2 rounded-xl px-2">
                {referrer.phone}
              </Tag>
            </div>
          </div>
        </div>

        <div className="registeredRefer bg-bgDark p-4 mt-6 rounded-xl shadow-xl shadow-white/5">
          <div className="title font-bold text-xl mb-4 flex flex-wrap items-center gap-2">
            <span>Registered Refers</span>
            <Tooltip title="Percentage">
              <div className="total-refers border border-solid border-primary text-primary text-sm px-1 py-px rounded-xl">
                ₦2,000 per 500 Clicks
              </div>
            </Tooltip>
          </div>

          <div className="flex gap-5 flex-wrap justify-between">
            <div className="wrap">
              <div className="label text-primary mb-2">Total</div>
              <div className="count font-bold text-2xl text-center">
                {referrer.registeredRefers.total}
              </div>
            </div>
            <Divider type="vertical" className="border-gray-500" />
            <div className="wrap">
              <div className="label text-primary mb-2">Paid</div>
              <div className="count font-bold text-2xl text-center">
                {referrer.registeredRefers.paid}
              </div>
            </div>
            <Divider type="vertical" className="border-gray-500" />
            <div className="wrap">
              <div className="label text-primary mb-2">Unpaid</div>
              <div className="count font-bold text-2xl text-center">
                {referrer.registeredRefers.unpaid}
              </div>
            </div>
          </div>
        </div>

        <div className="subscribed-refers bg-bgDark p-4 mt-6 rounded-xl shadow-xl shadow-white/5">
          <div className="title font-bold text-xl mb-4 flex flex-wrap items-center gap-2">
            <span>Subscribed Refers</span>
            <Tooltip title="Percentage">
              <div className="total-refers border border-solid border-primary text-primary text-sm px-1 py-px rounded-xl">
                ₦10,000 per subscribed users
              </div>
            </Tooltip>
          </div>

          <div className="flex gap-5 flex-wrap justify-between">
            <div className="wrap">
              <div className="label text-primary mb-2">Total</div>
              <div className="count font-bold text-2xl text-center">
                {referrer.subscribedRefers.total}
              </div>
            </div>
            <Divider type="vertical" className="border-gray-500" />
            <div className="wrap">
              <div className="label text-primary mb-2">Paid</div>
              <div className="count font-bold text-2xl text-center">
                {referrer.subscribedRefers.paid}
              </div>
            </div>
            <Divider type="vertical" className="border-gray-500" />
            <div className="wrap">
              <div className="label text-primary mb-2">Unpaid</div>
              <div className="count font-bold text-2xl text-center">
                {referrer.subscribedRefers.unpaid}
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <Tag className="text-gray-200 font-semibold border-gray-300 p-1 gap-2 rounded-xl px-2 text-base">
            Joined on{" "}
            <span className="text-primary">
              {new Date(referrer.createdAt).toDateString()}
            </span>
          </Tag>
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  await dbConnect();
  const referrerCode = params?.referrer;
  const referrer = await Affiliates.findOne(
    {
      referrerCode,
    },
    { updatedAt: 0 }
  ).lean();

  if (referrer) {
    referrer.createdAt = new Date(referrer.createdAt).toISOString();
    referrer._id = String(referrer._id);
  } else {
    return {
      redirect: {
        destination: "/affiliate-marketing",
        permanent: true,
      },
    };
  }

  console.log({ referrer });

  return {
    props: {
      referrer,
    },
  };
};

export default ReferrerDashboard;
