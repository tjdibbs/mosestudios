import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "Contacts",
    timestamps: true,
    minimize: false,
    versionKey: false,
  },
})
export default class Contact {
  @prop({ required: true })
  fullName: string;

  @prop()
  brandName: string;

  @prop({ lowercase: true, required: true })
  email: string;

  @prop()
  message: string;
}
