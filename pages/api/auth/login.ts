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

  if (!body?.email || !body?.password)
    throw new HttpError("Incomplete body fields", STATUS.BAD_REQUEST);

  const user = await Users.findOne(
    {
      email: body.email,
    },
    { __v: 0, updatedAt: 0 },
    {
      populate: ["affiliate"],
    }
  );

  if (!user)
    return res.json(new HttpError("User doesn't exist", STATUS.NOT_FOUND));

  const matched = await verifyPassword(body.password, user!.password);

  if (_.isEmpty(user) || !matched) {
    return res.json(
      new HttpError("Email or password is incorrect", STATUS.BAD_REQUEST)
    );
  }

  const _token = token.create(
    {
      user: _.pick(user, ["_id", "email", "firstName", "userType"]),
      tokenType: "accessToken",
    },
    "1w"
  );

  const serialized = serialize("tk", _token, {
    // sameSite: true,
    // httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60 * 24 * 2,
    path: "/",
  });

  const responseObject = {
    success: true,
    message: `Authenticated as ${user.email}`,
    user: {
      ..._.omit(user, ["password"]),
    },
    token: _token,
  };

  res.setHeader("Set-Cookie", serialized);
  return res.json(responseObject);
});

// export const config = {
//   runtime: "edge",
// };

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err);
    return res.json(
      new HttpError(
        err.message || "Internal Server Error",
        err.statusCode || 500
      )
    );
  },
});
