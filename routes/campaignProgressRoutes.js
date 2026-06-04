const express = require("express");
const campaignController = require("../controllers/campaignProgressController.js");
const router = express.Router();

router.route("/").get(campaignController.getAllCampaignProgress);
router.route("/:id").get(campaignController.getOneCampaignProgress);
router.route("/user/:id").get(campaignController.getAllCampaignsForUser);

module.exports = router;
