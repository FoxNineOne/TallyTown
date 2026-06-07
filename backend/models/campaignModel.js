const mongoose = require("mongoose");
const Merchant = require("./merchantModel");

const CampaignSchema = new mongoose.Schema({
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  active: { type: Boolean, required: true, default: true },
  description: {
    type: String,
    require: [
      true,
      "Please describe the campaign (Get a free X for every Y stamps!)",
    ],
  },
  requiredStamps: { type: Number, required: true },
});

// QUERY MIDDLEWARE
// CampaignSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "merchant",
//     select: "-__v",
//   });
// });

const Campaign = mongoose.model("Campaign", CampaignSchema);

module.exports = Campaign;
