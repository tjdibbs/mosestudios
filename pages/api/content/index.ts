import { NextRequest, NextResponse } from "next/server";
import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import formidable, { errors as formidableErrors } from "formidable";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter, expressWrapper } from "next-connect";
import cors from "cors";
import cloudinary from "cloudinary";
import { nanoid } from "@reduxjs/toolkit";
import { Contents } from "@models/index";
import dbConnect from "@lib/dbConnect";

cloudinary.v2.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: "dm7xl4bea",
});

const router = createRouter<NextApiRequest, NextApiResponse>();

router.put(async (req, res) => {
  await dbConnect();
  const form = formidable({});
  const [fields, files] = await form.parse(req);

  console.log({ fields, files });

  if (!files.file || !fields.title || !fields.userId) {
    throw new HttpError("Incomplete fields", STATUS.BAD_REQUEST);
  }

  const result = await cloudinary.v2.uploader.upload(files.file[0].filepath, {
    public_id: "content_" + nanoid(12),
  });

  await Contents.create({
    title: fields.title[0],
    description: fields.description?.length ? fields.description[0] : "",
    document: result.secure_url,
    userId: fields.userId,
    corrections: 3,
  });

  return res.json({ success: true, message: "Content created successfully" });
});

router.get(async (req, res) => {
  await dbConnect();
  const contents = await Contents.find({}).populate("userId", {
    password: 0,
    updatedAt: 0,
  });

  return res.json({
    contents,
    success: true,
  });
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default router.handler({
  onError: (err: any, req, res) => {
    console.error({ err });
    return res.json(
      new HttpError("Internal Server Error", err.statusCode || 500)
    );
  },
});
