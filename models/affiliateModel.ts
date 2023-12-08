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
    this.fullName.split(" ")[0] + generateRandom6DigitNumber() + count;

  next();
})
export default class Affiliate {
  _id: string;

  @prop({ required: true })
  fullName: string;

  @prop()
  phone: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop()
  address: string;

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

  @prop({ required: true })
  bankName: string;

  @prop({ required: true })
  bankAccountName: string;

  @prop({ required: true })
  bankAccountNumber: string;

  createdAt: Date | string;
  updatedAt: Date | string;
}
