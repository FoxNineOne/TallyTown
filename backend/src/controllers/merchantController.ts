import type { Request, Response, NextFunction } from "express";
import Merchants from "../models/merchantModel.js";

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
    merchant = await Merchants.findById(req.params.id);
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
