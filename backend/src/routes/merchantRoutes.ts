import express from "express";
const router = express.Router();
import merchantController from "../controllers/merchantController.js";

router.route("/:id").get(merchantController.getOneMerchant);
router.route("/").get(merchantController.getAllMerchants);
export default router;
