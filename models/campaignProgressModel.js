const mongoose = require("mongoose");

const campaignProgressSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign",
    required: true,
  },
  merchant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    required: true,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  requiredStamps: { type: Number, required: true },
  stamps: [
    {
      stampedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      createdAt: { type: Date, default: Date.now },
    },
  ],
  // Make a post save to auto calculate this
  completedStamps: { type: Number },
  redeemed: { type: Boolean, default: false },
  redeemedAt: { type: Date },
  redeemedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const campaignProgress = mongoose.model(
  "campaign_progresses", //this is what dictates the mongoDB collection  name
  campaignProgressSchema,
);

module.exports = campaignProgress;
