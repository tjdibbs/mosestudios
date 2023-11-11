import { STATUS } from "@lib/constants";
import { verifyPassword } from "@lib/crypto";
import HttpError from "@lib/httpError";
import { Users } from "@models/index";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import * as token from "@lib/token";
import dbConnect from "@lib/dbConnect";
import { Next } from "iconsax-react";
import { serialize } from "cookie";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    if (!body?.email || !body?.password)
      return NextResponse.json(
        new HttpError("Incomplete body fields", STATUS.BAD_REQUEST),
        { status: STATUS.BAD_REQUEST }
      );

    const user = await Users.findOne(
      {
        email: body.email,
      },
      { __v: 0, updatedAt: 0 }
    );

    if (!user)
      return NextResponse.json(
        new HttpError("User doesn't exist", STATUS.NOT_FOUND)
      );

    const matched = await verifyPassword(body.password, user!.password);

    if (_.isEmpty(user) || !matched) {
      return NextResponse.json(
        new HttpError("Email or password is incorrect", STATUS.BAD_REQUEST),
        { status: STATUS.BAD_REQUEST }
      );
    }

    const _token = token.create(
      {
        user: _.pick(user, ["_id", "email", "firstName", "userType"]),
        tokenType: "accessToken",
      },
      "2h"
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
      refreshToken: token.create(
        {
          user: _.pick(user, ["_id", "userType"]),
          tokenType: "refreshToken",
        },
        "1w"
      ),
    };

    return NextResponse.json(responseObject, {
      headers: {
        "Set-Cookie": serialized,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      new HttpError(err.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500 }
    );
  }
}
