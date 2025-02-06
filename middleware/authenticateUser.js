const express = require("express");
const router = express.Router();
const cmsController = require("../controllers/cmsController");
const authenticateUser = require("../middleware/authenticateToken");

// Apply authentication middleware based on userId only
router.get("/cms/items/:collection_id", authenticateUser, cmsController.getCmsItems);

module.exports = router;
