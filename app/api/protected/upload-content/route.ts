import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import formidable, { errors as formidableErrors } from "formidable";

export async function POST(req: NextRequest) {
  try {
    console.log({ server: true });
    // const body = await req.formData();
    // const form = formidable({});
    // const [fields, files] = await form.parse(req);

    // const file  = body.get("file")
    // const title = body.get("title")
    // const description = body.get("description")

    // console.log({ fields, files });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error({ error });
    return NextResponse.json(
      new HttpError(error.message, STATUS.INTERNAL_SERVER_ERROR),
      { status: 500 }
    );
  }
}
