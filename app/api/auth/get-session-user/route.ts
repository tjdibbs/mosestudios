import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
// import { corsHeaders } from "../login/route";
import { verify } from "@lib/token";
import { Users } from "@models/index";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

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
    });

    return NextResponse.json({
      user,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json(
      new HttpError(
        error.message,
        error.status || STATUS.INTERNAL_SERVER_ERROR
      ),
      { status: 500 }
    );
  }
}
