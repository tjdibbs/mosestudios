import HttpError from "@lib/httpError";
import _ from "lodash";
import dbConnect from "@lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = await req.body;

  const responseObject = {
    success: true,
  };

  return res.json(responseObject);
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    return res.json(
      new HttpError("Internal Server Error", err.statusCode || 500)
    );
  },
});
