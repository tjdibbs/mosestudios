import HttpError from "@lib/httpError";
import { Affiliates } from "@models/index";
import _ from "lodash";
import dbConnect from "@lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import Emailer from "@lib/emailer";
import { Email } from "@lib/emailer";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = await req.body;

  const newAffiliate = {
    fullName: body.fullName,
    phone: body.phone,
    email: body.email,
    address: body.address,
    bankName: body.bankName,
    bankAccountName: body.bankAccountName,
    bankAccountNumber: body.bankAccountNumber,
    // referralCode: body.split(" ")[0] +
  };

  await Affiliates.create(newAffiliate);
  await Emailer("bolaji@roshestudios.com", Email.AFFILIATE, newAffiliate);

  const responseObject = {
    success: true,
    message:
      "Your Data has been submitted successfully, we will get in touch with you soon",
  };

  return res.json(responseObject);
});

// export const config = {
//   runtime: "edge",
// };

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    return res.json(
      new HttpError("Internal Server Error", err.statusCode || 500)
    );
  },
});
