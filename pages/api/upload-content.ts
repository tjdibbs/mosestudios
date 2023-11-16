import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import formidable, { errors as formidableErrors } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.post(async (req, res) => {
  const form = formidable({});
  const [fields, files] = await form.parse(req);

  console.log({ fields, files });

  return res.json({ success: true });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error(err.stack);
    return res.json(
      new HttpError("Internal Server Error", err.statusCode || 500)
    );
  },
});
