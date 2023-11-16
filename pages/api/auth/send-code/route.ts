import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import Emailer, { Email } from "@lib/emailer";
import { Users } from "@models/index";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.email) throw new Error("Incomplete Fields");

    await Users.findOneAndUpdate({ email: body.email }, {});

    await Emailer(body.email, Email.SEND_CODE, {});
  } catch (error: any) {
    return NextResponse.json(
      new HttpError(error.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500 }
    );
  }
}
