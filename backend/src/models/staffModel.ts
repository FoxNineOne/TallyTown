import mongoose from "mongoose";
import Role from "./roleModel.ts";

const staffSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Role",
    required: true,
  },
});

staffSchema.pre(/^find/, function (this: any) {
  if (this.getOptions().skipPopulate) return;
  this.populate({
    path: "role",
    select: "description ",
  }).populate({
    path: "merchant",
    select: "name _id",
  });
});

const staff = mongoose.model("Staff", staffSchema, "staff");
export default staff;
