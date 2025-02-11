const express = require("express");
const authenticateToken = require("../middleware/authenticateToken");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");

router.post(
  "/start-payment",
  authenticateToken,
  paymentController.startPayment
);

router.post(
  "/refund-payment",
  authenticateToken,
  paymentController.refundPayment
);

module.exports = router;
