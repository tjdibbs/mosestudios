import { STATUS } from "@lib/constants";
import { verifyPassword } from "@lib/crypto";
import HttpError from "@lib/httpError";
import { Users } from "@models/index";
import _ from "lodash";
import { NextRequest, NextResponse } from "next/server";
import * as token from "@lib/token";
import dbConnect from "@lib/dbConnect";

export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const body = await req.json();

    console.log({ body });

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

    console.log({ user });

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

    const responseObject = {
      success: true,
      message: `Authenticated as ${user.email}`,
      user: {
        ..._.omit(user, ["password"]),
      },
      token: token.create(
        {
          user: _.pick(user, ["_id", "email", "firstName", "userType"]),
          tokenType: "accessToken",
        },
        "2h"
      ),
      refreshToken: token.create(
        {
          user: _.pick(user, ["_id", "userType"]),
          tokenType: "refreshToken",
        },
        "1w"
      ),
    };

    return NextResponse.json(responseObject);
  } catch (err: any) {
    return NextResponse.json(
      new HttpError(err.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500 }
    );
  }
}
