import HttpError from "@lib/httpError";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { Affiliates } from "@models/index";
import dbConnect from "@lib/dbConnect";
import { STATUS } from "@lib/constants";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const body = req.body;

  if (!body.userId || !body.bank)
    throw new HttpError("Incomplete Fields", STATUS.BAD_REQUEST);

  await dbConnect();
  await Affiliates.findByIdAndUpdate(body.userId, {
    $push: {
      banks: body.bank,
    },
  });

  return res.json({ success: true });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error({ err });
    return res.json(
      new HttpError(
        err.message ?? "Internal Server Error",
        err.statusCode || 500
      )
    );
  },
});
