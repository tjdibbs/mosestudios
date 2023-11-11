import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import { hashPassword } from "@lib/crypto";
import { Notifications, Users } from "@models/index";
import * as token from "@lib/token";
import dbConnect from "@lib/dbConnect";
import { omit } from "lodash";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

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
      "2h"
    );

    // await Emailer(user.email, Email.VERIFY, {
    //   firstName: user.firstName,
    //   code,
    // });

    const serialized = serialize("tk", _token, {
      // sameSite: true,
      // httpOnly: true,
      secure: process.env.NODE_ENV == "production",
      maxAge: 60 * 60 * 24 * 2,
      path: "/",
    });

    return NextResponse.json(
      {
        success: true,
        message: "User Registered Successfully",
        user: omit(user, ["password", "updatedAt"]),
        token: _token,
        // verifyToken: encrypt(
        //   JSON.stringify({ code, expireTime: moment().add(5, "m") })
        // ),
      },
      {
        headers: {
          "Set-Cookie": serialized,
          ...corsHeaders,
        },
      }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      new HttpError(err.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500, headers: corsHeaders }
    );
  }
}

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};
