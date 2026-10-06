import mongoose from "mongoose";

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
  reference: {
    type: String,
    required: false, // will generate after
    minlength: 8,
  },
});

// QUERY MIDDLEWARE
// TODO: Replace 'any' with the correct Query generic.
campaignProgressSchema.pre(/^find/, function (this: any) {
  if (this.getOptions().skipPopulate) return;
  this.populate({
    path: "merchant",
    select: "name photo",
  })
    .populate({
      path: "user",
      select: "name reference",
    })
    .populate({
      path: "campaign",
      select: "description",
    });
});
const campaignProgress = mongoose.model(
  "campaign_progress", //this is what dictates the mongoDB collection  name
  campaignProgressSchema,
  "campaign_progress", // this stops mongo pluralising!
);

export default campaignProgress;
