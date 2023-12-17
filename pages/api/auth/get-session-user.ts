import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
// import { corsHeaders } from "../login/route";
import { verify } from "@lib/token";
import { Users } from "@models/index";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import dbConnect from "@lib/dbConnect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = req.body;

  if (!body.token) {
    throw new HttpError("Incomplete fields", STATUS.BAD_REQUEST);
  }

  const { payload, error } = verify(body.token);

  if (error) {
    throw new HttpError(error, STATUS.BAD_REQUEST);
  }

  const user = await Users.findById(payload?.user._id, {
    password: 0,
    updatedAt: 0,
  })
    .populate("affiliate")
    .populate("referrerCode");

  return res.json({
    user,
    success: true,
  });
});

// export const config = {
//   runtime: "edge",
// };

export default router.handler({
  onError: (err: any, req, res) => {
    console.error({ err });
    return res.json(
      new HttpError("Internal Server Error", err.statusCode || 500)
    );
  },
});
