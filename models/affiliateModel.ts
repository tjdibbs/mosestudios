import { modelOptions, prop } from "@typegoose/typegoose";

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

  @prop({ lowercase: true, required: true })
  email: string;

  @prop()
  address: string;

  @prop({ required: true })
  bankName: string;

  @prop({ required: true })
  bankAccountName: string;

  @prop({ required: true })
  bankAccountNumber: string;
}
