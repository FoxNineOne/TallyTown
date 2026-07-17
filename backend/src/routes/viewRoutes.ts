import express from "express";
const router = express.Router();
import viewsController from "../controllers/viewsController.js";

router.route("/").get(viewsController.home);
router.route("/login").get(viewsController.login);

export default router;
