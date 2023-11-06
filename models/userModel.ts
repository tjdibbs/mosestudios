import { prop } from "@typegoose/typegoose";
import { Schema } from "mongoose";

export default class User {
  @prop()
  firstName: string;

  @prop()
  lastName: string;

  @prop({ unique: true, lowercase: true, required: true })
  email: string;

  @prop({ required: true })
  password: string;

  @prop({ enum: ["gold", "silver", "bronze"] })
  package: string;

  @prop({ default: false })
  upgraded: boolean;

  @prop({ type: Schema.Types.Mixed, default: {} })
  settings: object;
}
