//exports.login
const express = require("express");
const authController = require("../controllers/authController.js");
const router = express.Router();

router.route("/").post(authController.login);

module.exports = router;
