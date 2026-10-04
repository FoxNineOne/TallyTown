import express from "express";
import campaignController from "../controllers/campaignProgressController.js";
const router = express.Router();

router.route("/").get(campaignController.getAllCampaignProgress);
router.route("/:id").get(campaignController.getOneCampaignProgress);
router.route("/user/:id").get(campaignController.getAllCampaignProgressForUser);
router
  .route("/merchant/:id")
  .get(campaignController.getAllActiveCampaignProgressForMerchant);
router
  .route("/card/:campaignProgressId/:userId")
  .get(campaignController.getStampCodes);
export default router;
