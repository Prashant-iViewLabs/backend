const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const authenticateToken = require("../middleware/authenticateToken");

router.get(
  "/child-details",
  authenticateToken,
  cmsController.getChildDetails
);

router.post(
  "/add-child",
  authenticateToken,
  cmsController.addChild
)

router.post(
  "/add-registration",
  authenticateToken,
  cmsController.addRegistration
);

router.get(
  "/events",
  authenticateToken,
  cmsController.getEvents
);

router.get(
  "/my-registrations",
  authenticateToken,
  cmsController.getMyRegistrations
)

module.exports = router;
