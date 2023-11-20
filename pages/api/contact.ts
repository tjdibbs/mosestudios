import HttpError from "@lib/httpError";
import { Contacts } from "@models/index";
import _ from "lodash";
import dbConnect from "@lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import Emailer, { Email } from "@lib/emailer";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = await req.body;

  const contact = {
    brandName: body.brandName,
    email: body.email,
    message: body.message,
    fullName: body.fullName,
  };

  await Contacts.create(contact);

  await Emailer("bolaji@roshestudios.com", Email.CONTACT, contact);

  const responseObject = {
    success: true,
    message:
      "Your message has been sent successfully, We will get in touched with you soon",
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
