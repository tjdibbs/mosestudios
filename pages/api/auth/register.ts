import { STATUS } from "@lib/constants";
import { verifyPassword, hashPassword } from "@lib/crypto";
import HttpError from "@lib/httpError";
import { Users, Notifications } from "@models/index";
import _ from "lodash";
import * as token from "@lib/token";
import dbConnect from "@lib/dbConnect";
import { serialize } from "cookie";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import { NextResponse } from "next/server";
import { omit } from "lodash";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  await dbConnect();
  const body = req.body;

  if (!body.email || !body.password)
    throw new HttpError("Incomplete body fields", STATUS.BAD_REQUEST);

  const dbUser = await Users.findOne({ email: body.email });

  if (dbUser) {
    throw new HttpError("User Already Exist", STATUS.FORBIDDEN);
  }

  const hashedPassword = await hashPassword(body.password);
  // create user, user setting and user notifications
  const user = await Users.create({
    ...body,
    password: hashedPassword,
  });

  await Notifications.create({
    _id: user._id,
    notifications: [
      {
        name: "Roshestudios",
        title: "Welcoming message",
        description:
          "Welcome to Roshestudios, Thanks for choosing us, We are glad to tell you that your account has been activated.",
      },
    ],
  });

  // const code = generateRandom5DigitNumber();
  const _token = token.create(
    {
      email: user.email,
      firstName: user.email,
      _id: user._id,
    },
    "1w"
  );

  // await Emailer(user.email, Email.VERIFY, {
  //   firstName: user.firstName,
  //   code,
  // });

  const serialized = serialize("tk", _token, {
    // sameSite: true,
    // httpOnly: true,
    secure: process.env.NODE_ENV == "production",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  res.setHeader("Set-Cookie", serialized);
  return res.json({
    success: true,
    message: "User Registered Successfully",
    user: omit(user, ["password", "updatedAt"]),
    token: _token,
    // verifyToken: encrypt(
    //   JSON.stringify({ code, expireTime: moment().add(5, "m") })
    // ),
  });
});

export const config = {
  runtime: "edge",
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    return res.json(
      new HttpError("Internal Server Error", err.statusCode || 500)
    );
  },
});
