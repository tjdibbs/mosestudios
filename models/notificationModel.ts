import { prop, modelOptions } from "@typegoose/typegoose";
import { Schema } from "mongoose";

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
class NotificationObject {
  @prop()
  name: string;

  @prop()
  title: string;

  @prop({ default: "" })
  image: string;

  @prop()
  description: string;

  @prop({ default: false })
  seen: boolean;
}

export default class Notification {
  @prop({ type: Schema.Types.ObjectId })
  _id: string;

  @prop({ type: () => [NotificationObject] })
  notifications: NotificationObject[];
}
