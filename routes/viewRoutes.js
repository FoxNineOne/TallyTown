const express = require("express");
const router = express.Router();

const viewsController = require("../controllers/viewsController");

router.route("/").get(viewsController.home);
router.route("/login").get(viewsController.login);

module.exports = router;
