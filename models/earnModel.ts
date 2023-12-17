import { prop, modelOptions } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
export class Review {
  _id: string;

  @prop()
  message: string;
  createdAt: string;
}

@modelOptions({
  schemaOptions: {
    collection: "Contents",
    timestamps: true,
    versionKey: false,
  },
})
export default class Content {
  _id: string;

  @prop()
  title: string;

  @prop({ type: Schema.Types.ObjectId, ref: "User" })
  userId: string | Roshestudios.User;

  @prop({ type: String })
  description: string;

  @prop({ type: String })
  document: string;

  @prop({ required: true })
  bankName: string;

  @prop({ required: true })
  accountName: string;

  @prop({ required: true })
  accountNumber: string;

  createdAt: string;
  updatedAt: string;
}
