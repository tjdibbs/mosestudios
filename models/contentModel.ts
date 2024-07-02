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

  @prop({ type: () => [Review], default: [] })
  reviews: Review[];

  @prop({ type: Number, default: 0 })
  corrections: number;

  @prop({ type: Schema.Types.Mixed })
  product: {
    type: string;
    url: string;
    length: string;
    size: string;
  };

  createdAt: string;
  updatedAt: string;
}
