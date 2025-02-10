const paymentService = require("../services/razorpayServices");

const startPayment = async (req, res) => {
  const {
    userID,
    eventID,
    amount,
    service,
    name,
    contactNo,
    email,
    roleType,
    groupSize,
  } = req.body;
  try {
    const paymentLink = await paymentService.paymentIntegration({
      userID,
      eventID,
      amount,
      service,
      name,
      contactNo,
      email,
      roleType,
      groupSize,
    });
    res.json(paymentLink);
  } catch (error) {
    console.error("Error starting payment:", error);
    res.status(500).json({ error: "Failed to start payment" });
  }
};

const refundPayment = async (req, res) => {
    const { amount, service, paymentId } = req.body;
    try {
        const response = await paymentService.paymentRefund({
        amount,
        service,
        paymentId,
        });
        res.json(response);
    } catch (error) {
        console.error("Error refunding payment:", error);
        res.status(500).json({ error: "Failed to refund payment" });
    }
}


module.exports = {
  startPayment,
  refundPayment
};
