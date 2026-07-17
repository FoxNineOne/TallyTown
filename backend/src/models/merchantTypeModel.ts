import mongoose from "mongoose";

const merchantTypeSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    unique: true,
  },
  icon: {
    type: String,
  },
});

const merchantType = mongoose.model("merchant_types", merchantTypeSchema);

export default merchantType;
