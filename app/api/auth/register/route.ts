import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import { encrypt, hashPassword } from "@lib/crypto";
import { Notifications, Users } from "@models/index";
import * as token from "@lib/token";
import dbConnect from "@lib/dbConnect";
import Emailer, { Email } from "@lib/emailer";
import generateRandom5DigitNumber from "@lib/getRandomDigits";
import moment from "moment";
import { omit } from "lodash";

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

    return NextResponse.json({
      success: true,
      message: "User Registered Successfully",
      user: omit(user, ["password", "updatedAt"]),
      token: _token,
      // verifyToken: encrypt(
      //   JSON.stringify({ code, expireTime: moment().add(5, "m") })
      // ),
    });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      new HttpError(err.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500 }
    );
  }
}
