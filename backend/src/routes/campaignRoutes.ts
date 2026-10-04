import express from "express";
const router = express.Router();
import campaignController from "../controllers/campaignController.js";

router.route("/").get(campaignController.getAllCampaigns);
router.route("/:id").get(campaignController.getOneCampaign);
router
  .route("/merchant/:id")
  .get(campaignController.getAllCampaignsForOneMerchant);
export default router;
