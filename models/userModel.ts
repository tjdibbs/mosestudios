import generateRandom5DigitNumber from "@lib/getRandomDigits";
import { prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export default class User {
  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop({ unique: true, lowercase: true, required: true })
  email: string;

  @prop({ default: "" })
  image: string;

  @prop({ required: true })
  password: string;

  @prop({ enum: ["gold", "silver", "bronze"] })
  package: string;

  // @prop({ default: generateRandom5DigitNumber })
  // verificationCode: number;

  @prop({ default: false })
  upgraded: boolean;

  @prop({ type: Schema.Types.Mixed, default: {} })
  settings: object;

  @prop({ enum: ["admin", "client"], default: "client" })
  userType: string;

  createdAt: string;
  updated: string;
}
