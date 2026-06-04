const express = require("express");
const router = express.Router();
const campaignController = require("../controllers/campaignController.js");

router.route("/").get(campaignController.getAllCampaigns);
router.route("/:id").get(campaignController.getOneCampaign);

module.exports = router;
