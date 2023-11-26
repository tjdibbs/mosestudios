import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { Contents } from "@models/index";
import dbConnect from "@lib/dbConnect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await dbConnect();
  const id = req.query.id;

  if (!id) throw new HttpError("Incomplete Fields", STATUS.BAD_REQUEST);

  const content = await Contents.findById(id)
    .populate("userId", { password: 0, updatedAt: 0 })
    .lean();

  return res.json({ success: true, content });
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
