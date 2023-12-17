import generateRandom6DigitNumber from "@lib/getRandomDigits";
import { modelOptions, prop, Pre } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "Affiliates",
    timestamps: true,
    minimize: false,
    versionKey: false,
  },
})
@Pre<Affiliate>("save", async function (next) {
  const count = await this.collection.countDocuments();
  this.referrerCode =
    this.referrerCode.split(" ")[0] + generateRandom6DigitNumber() + count;

  next();
})
export default class Affiliate<T = string> {
  @prop({ type: Schema.Types.ObjectId, required: true })
  _id: string;

  @prop({ type: Schema.Types.ObjectId, ref: "User" })
  user: T;

  @prop({ unique: true, lowercase: true })
  referrerCode: string;

  @prop({ default: 0, type: Number })
  totalRefers: number;

  @prop({
    type: Schema.Types.Mixed,
    default: {
      unpaid: 0,
      paid: 0,
      total: 0,
    },
  })
  registeredRefers: {
    unpaid: number;
    paid: number;
    total: number;
  };

  @prop({
    type: Schema.Types.Mixed,
    default: {
      unpaid: 0,
      paid: 0,
      total: 0,
    },
  })
  subscribedRefers: {
    unpaid: number;
    paid: number;
    total: number;
  };

  @prop({ type: Array, default: [] })
  banks: {
    bankName: string;
    accountName: string;
    accountNumber: number;
  }[];

  createdAt: Date | string;
  updatedAt: Date | string;
}
