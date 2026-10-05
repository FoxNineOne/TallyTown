import mongoose, { Model } from "mongoose";

const merchantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter a Merchant/Company Name"],
    unique: true,
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter a short description"],
    unique: true,
    trim: true,
  },
  merchantType: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Please enter a Type"],
  },
  openingHours: { type: Object },
  address: { type: String, trim: true },
  photo: { type: String, trim: true },
  location: {
    type: {
      type: String,
      default: "Point",
      enum: ["Point"],
    },
    coordinates: [Number],
  },

  active: {
    type: Boolean,
    default: true,
  },
});

const Merchant = mongoose.model("Merchant", merchantSchema);

export default Merchant;
