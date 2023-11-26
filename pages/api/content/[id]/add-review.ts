import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { Contents } from "@models/index";
import dbConnect from "@lib/dbConnect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(async (req, res) => {
  await dbConnect();
  const id = req.query.id;
  const review = req.body;

  if (!id || !review)
    throw new HttpError("Incomplete Fields", STATUS.BAD_REQUEST);

  await Contents.findByIdAndUpdate(id, {
    $push: {
      reviews: review,
    },
  });

  return res.json({ success: true, message: "Review Added Successfully" });
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
