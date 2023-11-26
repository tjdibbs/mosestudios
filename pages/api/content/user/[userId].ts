import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { Contents } from "@models/index";
import dbConnect from "@lib/dbConnect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await dbConnect();
  const userId = req.query.userId;

  if (!userId) throw new HttpError("Incomplete Fields", STATUS.BAD_REQUEST);

  const contents = await Contents.find(
    { userId },
    {},
    {
      sort: {
        createdAt: -1,
      },
    }
  ).lean();

  return res.json({ success: true, contents });
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
