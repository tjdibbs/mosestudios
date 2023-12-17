import { Severity, modelOptions, prop, Pre } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({
  schemaOptions: { collection: "Users", timestamps: true, versionKey: false },
  options: {
    allowMixed: Severity.ALLOW,
  },
})
@Pre<User>("save", async function (next) {
  this.affiliate = this._id;

  next();
})
export default class User<T = string> {
  _id: string;

  @prop()
  firstName: string;

  @prop()
  lastName: string;

  fullName: () => string;

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

  @prop({ type: String, ref: "Affiliate", refPath: "referrerCode" })
  referrerCode: string;

  @prop({ type: Schema.Types.ObjectId, ref: "Affiliate" })
  affiliate: T;

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
  userType: "admin" | "client";

  @prop({ type: Number })
  contentLeft: number;

  @prop({ type: Date })
  contentLeftUpdatedDate: string;

  createdAt: string;
  updated: string;
}
