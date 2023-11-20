import { modelOptions, prop } from "@typegoose/typegoose";

@modelOptions({
  schemaOptions: {
    collection: "Interns",
    timestamps: true,
    minimize: false,
    versionKey: false,
  },
})
export default class Intern {
  @prop({ required: true })
  fullName: string;

  @prop()
  phone: string;

  @prop({ lowercase: true, required: true })
  email: string;

  @prop()
  address: string;

  @prop({ required: true })
  portfolio: string;

  @prop({ required: true })
  proficientSoftware: string;
}
