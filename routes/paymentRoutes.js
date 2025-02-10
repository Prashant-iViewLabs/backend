const express = require("express");
const router = express.Router();

const paymentController = require("../controllers/paymentControllers");

router.post("/start-payment", paymentController.startPayment);

router.post("/refund-payment", paymentController.refundPayment);

module.exports = router;
