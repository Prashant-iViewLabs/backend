const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const authenticateToken = require("../middleware/authenticateToken");

router.get(
  "/items/:collection_id",
  authenticateToken,
  cmsController.getCmsItems
);

router.post(
  "/add-registration/:collection_id",
  authenticateToken,
  cmsController.addRegistration
);

module.exports = router;
