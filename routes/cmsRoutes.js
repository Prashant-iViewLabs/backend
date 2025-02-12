const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const authenticateToken = require("../middleware/authenticateToken");

// Child Routes
router.get("/child-details", authenticateToken, cmsController.getChildDetails);

router.post("/add-child", authenticateToken, cmsController.addChild);

router.post("/update-child", authenticateToken, cmsController.updateChild);

router.post("/delete-child", authenticateToken, cmsController.deleteChild);

// Event Routes

router.get("/events", authenticateToken, cmsController.getEvents);

router.get("/get-event", authenticateToken, cmsController.getEventById)

router.get("/event-slug", authenticateToken, cmsController.getEventIdBySlug);

// Registration Routes
router.post(
  "/add-registration",
  authenticateToken,
  cmsController.addRegistration,
);
router.get(
  "/my-registrations",
  authenticateToken,
  cmsController.getMyRegistrations
);

router.post(
  "/delete-registration",
  authenticateToken,
  cmsController.deleteRegistration,
)

router.post(
  "/cancel-registration",
  authenticateToken,
  cmsController.cancelRegistration
)

module.exports = router;
