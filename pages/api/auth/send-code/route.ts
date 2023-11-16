import { STATUS } from "@lib/constants";
import { verifyPassword } from "@lib/crypto";
import HttpError from "@lib/httpError";
import { Users } from "@models/index";
import _ from "lodash";
import * as token from "@lib/token";
import dbConnect from "@lib/dbConnect";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = await req.body;

  const responseObject = {
    success: true,
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
