import HttpError from "@lib/httpError";
import { Affiliates } from "@models/index";
import _ from "lodash";
import dbConnect from "@lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import Emailer from "@lib/emailer";
import { Email } from "@lib/emailer";
import { STATUS } from "@lib/constants";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = await req.body;

  const newAffiliate = await Affiliates.create({
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    address: body.address,
    bankName: body.bankName,
    bankAccountName: body.bankAccountName,
    bankAccountNumber: body.bankAccountNumber,
  });

  await Emailer("bolaji@roshestudios.com", Email.AFFILIATE, newAffiliate);

  const responseObject = {
    success: true,
    referrerCode: newAffiliate.referrerCode,
    message:
      "Your Data has been submitted successfully, we will get in touch with you soon",
  };

  return res.json(responseObject);
});

export default router.handler({
  onError: (err: any, req, res) => {
    // console.error({ message: err.message });
    const isDup = err.message.includes("email");
    const statusCode =
      err.statusCode || STATUS[isDup ? "BAD_REQUEST" : "INTERNAL_SERVER_ERROR"];
    const message = isDup ? "User already exist" : "Internal Server Error";

    return res.json(new HttpError(message, statusCode));
  },
});
