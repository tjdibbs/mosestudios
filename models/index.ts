// models/index.ts
import User from "@models/userModel";
import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import Notification from "./notificationModel";
import { BeAnObject } from "@typegoose/typegoose/lib/types";
import mongoose from "mongoose";

export const Users =
  (mongoose.models["User"] as ReturnModelType<typeof User, BeAnObject>) ||
  getModelForClass(User, {
    schemaOptions: { collection: "Users", timestamps: true, versionKey: false },
  });

export const Notifications =
  (mongoose.models["Notification"] as ReturnModelType<
    typeof Notification,
    BeAnObject
  >) ||
  getModelForClass(Notification, {
    schemaOptions: {
      collection: "Notifications",
      timestamps: true,
      versionKey: false,
    },
  });

// add other models here
