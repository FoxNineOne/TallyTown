import type { Request, Response, NextFunction } from "express";
import Merchants from "../models/merchantModel.js";
import mongoose, { Model } from "mongoose";

interface IdParams {
  id: string;
}

const getAllMerchants = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const merchants = await Merchants.find();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: merchants.length,
      data: { merchants },
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

const getOneMerchant = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let merchant;
  try {
    //merchant = await Merchants.findById(req.params.id);
    merchant = await Merchants.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.params.id),
        },
      },
      {
        $lookup: {
          from: "merchant_types",
          localField: "merchantType",
          foreignField: "_id",
          as: "merchantType",
        },
      },

      {
        $project: {
          _id: 0,
          name: "$name",
          description: "$description",
          merchantTypeIcon: "$merchantType.photo",
          merchantTypeDescription: "$merchantType.description",
          photo: "$photo",
          address: "$address",
          openingHours: "$openingHours",
          location: "$location",
        },
      },
    ]);

    // SEND RESPONSE
    if (!merchant) {
      return res.status(404).json({
        status: "fail",
        message: "Merchant not found. Ensure you're using the correct id",
      });
    } else {
      res.status(200).json({
        status: "success",
        data: { merchant },
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

/*
AddMerchant?
UpdateMerchant - for MerchantAdmin? 

*/

export default {
  getAllMerchants,
  getOneMerchant,
};
