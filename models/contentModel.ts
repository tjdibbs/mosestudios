import { prop, modelOptions } from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true, versionKey: false } })
class Review {
  @prop()
  name: string;

  @prop()
  message: string;

  createdAt: string;
  updatedAt: string;
}

@modelOptions({
  schemaOptions: {
    collection: "Contents",
    timestamps: true,
    versionKey: false,
  },
})
export default class Content {
  @prop()
  title: string;

  @prop()
  description: string;

  @prop({ type: Array, default: [] })
  images: string[];

  @prop({ type: () => [Review] })
  reviews: Review[];

  createdAt: string;
  updatedAt: string;
}
