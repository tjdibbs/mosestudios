import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
  } catch (error: any) {
    return NextResponse.json(
      new HttpError(error.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500 }
    );
  }
}
