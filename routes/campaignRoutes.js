const express = require("express");
const campaignController = require("../controllers/campaignController.js");
const router = express.Router();

router.route("/").get(campaignController.getAllCampaigns);
router.route("/:id").get(campaignController.getOneCampaign);

module.exports = router;
