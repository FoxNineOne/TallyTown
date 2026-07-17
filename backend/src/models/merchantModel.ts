import mongoose from "mongoose";

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
    //TODO come back and link this to a lookup of merchant type! This will then require to be ID, not string
    type: String,
    required: [true, "Please enter a Type"],
  },

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
