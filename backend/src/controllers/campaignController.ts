import Campaign from "../models/campaignModel.js";
import type { Request, Response, NextFunction } from "express";

const getAllCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const campaigns = await Campaign.find();

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

    return res.status(500).json({
      status: "error",
      message: "Unknown error",
    });
  }
};

const getOneCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let campaign;
  try {
    campaign = await Campaign.findById(req.params.id);
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
    const message = err instanceof Error ? err.message : "Unknown error";

    return res.status(500).json({
      status: "error",
      message,
    });
  }
};

export default {
  getAllCampaigns,
  getOneCampaign,
};
