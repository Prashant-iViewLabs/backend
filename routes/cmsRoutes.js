const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const authenticateToken = require("../middleware/authenticateToken");
const authorizeRoles = require("../middleware/authorizeRoles");

router.get("/public/:collection_id", cmsController.getCmsItems);
router.get(
  "/items/:collection_id",
  authenticateToken,
//   authorizeRoles("admin", "editor"),
  cmsController.getCmsItems
);

module.exports = router;
