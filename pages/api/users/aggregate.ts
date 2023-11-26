import HttpError from "@lib/httpError";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { Users } from "@models/index";
import dbConnect from "@lib/dbConnect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await dbConnect();
  const [aggregate] = await Users.aggregate([
    {
      $project: {
        plan: 1,
      },
    },
    {
      $group: {
        _id: "$plan",
        count: {
          $sum: 1,
        },
      },
    },
    {
      $group: {
        _id: null,
        counts: {
          $push: {
            k: "$_id",
            v: "$count",
          },
        },
      },
    },
    {
      $project: {
        _id: 0,
        counts: { $arrayToObject: "$counts" },
      },
    },
  ]);

  return res.json({ success: true, aggregate });
});

export default router.handler({
  onError: (err: any, req, res) => {
    return res.json(
      new HttpError(
        err.message ?? "Internal Server Error",
        err.statusCode || 500
      )
    );
  },
});
