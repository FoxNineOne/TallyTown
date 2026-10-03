import CampaignProgress from "../models/campaignProgressModel.js";
import type { Request, Response, NextFunction } from "express";

interface IdParams {
  id: string;
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

const getAllCampaignsForUser = async (
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

export default {
  getAllCampaignProgress,
  getOneCampaignProgress,
  getAllCampaignsForUser,
};
