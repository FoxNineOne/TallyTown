import express from "express";
import campaignController from "../controllers/campaignProgressController.js";
const router = express.Router();

router.route("/").get(campaignController.getAllCampaignProgress);
router.route("/:id").get(campaignController.getOneCampaignProgress);
router.route("/user/:id").get(campaignController.getAllCampaignsForUser);

export default router;
