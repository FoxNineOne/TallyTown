import CampaignProgress from "../models/campaignProgressModel.js";
import type { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";

interface IdParams {
  id: string;
  campaignProgressId: string;
  userId: string;
  reference: string;
}

// Probably should look into limit and paging.
const getAllCampaignProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const campaigns = await CampaignProgress.find();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: campaigns.length,
      data: { campaigns },
    });
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};

const getOneCampaignProgress = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let campaign;
  try {
    campaign = await CampaignProgress.findById(req.params.id);
    // SEND RESPONSE
    if (!campaign) {
      return res.status(404).json({
        status: "fail",
        message: "Campaign not found. Ensure you're using the correct id",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { campaign },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};

const getAllCampaignProgressForUser = async (
  req: Request<IdParams>,
  res: Response,
) => {
  try {
    const campaigns = await CampaignProgress.find({ user: req.params.id }).sort(
      { _id: 1 },
    );
    if (!campaigns) {
      return res.status(404).json({
        status: "fail",
        message: "No records returned",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { campaigns },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};

const getAllActiveCampaignProgressForMerchant = async (
  //TODO needs auth permissions for admins only
  req: Request<IdParams>,
  res: Response,
) => {
  try {
    const campaigns = await CampaignProgress.find({
      merchant: req.params.id,
      redeemed: false,
    }).sort({ _id: -1 });

    if (!campaigns) {
      return res.status(404).json({
        status: "fail",
        message: "No records returned",
      });
    } else {
      res.status(200).json({
        status: "success",

        results: campaigns.length,
        data: { campaigns },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};

const getStampCodes = async (
  req: Request<IdParams>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { reference: campaignReference } = await CampaignProgress.findById(
      req.params.campaignProgressId,
      "reference -_id",
    ).setOptions({ skipPopulate: true });

    const { reference: userReference } = await User.findById(
      req.params.userId,
      "reference -_id",
    ).setOptions({ skipPopulate: true });
    // TODO better error handling here.. this is lazy quick work
    if (!campaignReference || !userReference) {
      return res.status(404).json({
        status: "fail",
        message: "No records returned",
      });
    } else {
      res.status(200).json({
        status: "success",

        data: { campaignReference, userReference },
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }

  next();
};

//addStampToCampaignProgress

export default {
  getAllCampaignProgress,
  getOneCampaignProgress,
  getAllCampaignProgressForUser,
  getAllActiveCampaignProgressForMerchant,
  getStampCodes,
};
