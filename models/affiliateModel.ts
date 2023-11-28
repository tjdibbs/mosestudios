import { modelOptions, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: {
    collection: "Affiliates",
    timestamps: true,
    minimize: false,
    versionKey: false,
  },
})
export default class Affiliate {
  @prop({ required: true })
  fullName: string;

  @prop()
  phone: string;

  @prop({ lowercase: true, required: true, unique: true })
  email: string;

  @prop()
  address: string;

  @prop({ unique: true, required: true })
  referralCode: string;

  @prop({ type: Schema.Types.Mixed })
  refers: {
    total: number;
    registered: number;
    subscribed: number;
  };

  @prop({ required: true })
  bankName: string;

  @prop({ required: true })
  bankAccountName: string;

  @prop({ required: true })
  bankAccountNumber: string;
}
