import { modelOptions, prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: { collection: "Users", timestamps: true, versionKey: false },
})
export default class User {
  _id: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop()
  phone: string;

  @prop()
  company: string;

  @prop({ unique: true, lowercase: true, required: true })
  email: string;

  @prop({ default: "" })
  image: string;

  @prop({ required: true })
  password: string;

  @prop({ type: String, ref: "Affiliate", refPath: "referralCode" })
  referral: string;

  @prop({ enum: ["gold", "silver", "bronze", "diamond"] })
  plan: "gold" | "silver" | "bronze" | "diamond";

  // @prop({ default: generateRandom5DigitNumber })
  // verificationCode: number;

  @prop({ default: false })
  upgraded: boolean;

  @prop({ type: Schema.Types.Mixed, default: {} })
  settings: object;

  @prop({ type: String, default: "inactive" })
  status: "active" | "inactive";

  @prop({ enum: ["admin", "client"], default: "client" })
  userType: string;

  @prop({ type: Number })
  contentLeft: number;

  @prop({ type: Date })
  contentLeftUpdatedDate: string;

  createdAt: string;
  updated: string;
}
