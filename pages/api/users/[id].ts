import { STATUS } from "@lib/constants";
import HttpError from "@lib/httpError";
import type { NextApiRequest, NextApiResponse } from "next";
import { createRouter } from "next-connect";
import { Users } from "@models/index";
import dbConnect from "@lib/dbConnect";

const router = createRouter<NextApiRequest, NextApiResponse>();

router.get(async (req, res) => {
  await dbConnect();
  const id = req.query.id;

  if (!id) throw new HttpError("Incomplete Fields", STATUS.BAD_REQUEST);

  const user = await Users.findById(id, { password: 0, updatedAt: 0 })
    .populate("affiliate")
    .populate("referrerCode");

  return res.json({ success: true, user });
});

//
router.patch(async (req, res) => {
  await dbConnect();
  const id = req.query.id;
  const { plan } = req.body;

  if (!id) throw new HttpError("Incomplete Fields", STATUS.BAD_REQUEST);

  const user = await Users.findByIdAndUpdate(id, { plan });

  return res.json({ success: true, user });
});

export default router.handler({
  onError: (err: any, req, res) => {
    console.error({ err });
    return res.json(
      new HttpError(
        err.message ?? "Internal Server Error",
        err.statusCode || 500
      )
    );
  },
});
