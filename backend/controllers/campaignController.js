const Campaign = require("../models/campaignModel");

exports.getAllCampaigns = async (req, res, next) => {
  try {
    const campaigns = await Campaign.find();

    // SEND RESPONSE
    res.status(200).json({
      status: "success",
      results: campaigns.length,
      data: { campaigns },
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  }
};

exports.getOneCampaign = async (req, res, next) => {
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
    if (!campaign) {
      return res.status(404).json({
        status: "fail",
        message: "Campaign not found. Ensure you're using the correct id",
      });
    } else {
      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }
  }
};
