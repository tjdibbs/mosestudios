// models/index.ts
import User from "@models/userModel";
import { ReturnModelType, getModelForClass } from "@typegoose/typegoose";
import Notification from "./notificationModel";
import {
  AnyParamConstructor,
  BeAnObject,
} from "@typegoose/typegoose/lib/types";
import mongoose from "mongoose";
import Content from "./contentModel";

type M<T extends AnyParamConstructor<any>> = ReturnModelType<T, BeAnObject>;

export const Users =
  (mongoose.models["User"] as M<typeof User>) || getModelForClass(User);

export const Notifications =
  (mongoose.models["Notification"] as M<typeof Notification>) ||
  getModelForClass(Notification);

export const Contents =
  (mongoose.models["Content"] as M<typeof Content>) ||
  getModelForClass(Content);

// add other models here
