const Razorpay = require("razorpay");

const { razorpayKey, razorpayKeySecret } = require("../config/config");

const razorpay = new Razorpay({
  key_id: razorpayKey, // Replace with your Razorpay Key ID
  key_secret: razorpayKeySecret, // Replace with your Razorpay Key Secret
});
const paymentIntegration = async ({
  userID,
  eventID,
  amount,
  service,
  name,
  contactNo,
  email,
  roleType,
  groupSize,
}) => {
  // // Check if customer already exists
  // const existingCustomer = await checkCustomerExists(email);
  // console.log("EXISTING CUSTOMER", existingCustomer);
  // if (existingCustomer) {
  //     // customer_id = existingCustomer.id; // Reuse customer ID if found
  // }
  let customer_id = "123";
  const paymentLinkOptions = {
    amount: amount * 100,
    currency: "INR",
    accept_partial: false,
    description: `Payment for ${service}`,
    customer: customer_id
      ? { id: customer_id }
      : {
          name: String(name),
          contact: String(contactNo),
          email: String(email),
        },
    notify: {
      sms: false,
      email: false,
    },
    callback_url:
      "https://learners-lab.webflow.io/registration-successfull?eventId=" +
      eventID +
      "&userId=" +
      userID +
      "&roleType=" +
      roleType +
      "&amount=" +
      amount +
      "&groupSize=" +
      groupSize,
    callback_method: "get",
  };
  console.log({ paymentLinkOptions });
  // Adding some basic validation checks
  // if (!name || !contactNo || !email) {
  //   throw new Error("Customer information is missing or invalid");
  // }
  try {
    const response = await razorpay.paymentLink.create(paymentLinkOptions);
    console.log("Payment link created: ", response);
    return response.short_url;
  } catch (error) {
    console.error("Error creating payment link: ", error);
    throw error;
  }
};



const paymentRefund = async ({ amount, service, paymentId }) => {
  console.log({
    amount,
    service,
    paymentId,
  });
  const paymentLinkOptions = {
    amount: amount * 100,
    speed: "normal",
    notes: {
      event_name: service,
    },
    receipt: paymentId,
  };
  console.log({ paymentLinkOptions });
  try {
    const response = await razorpay.payments.refund(
      paymentId,
      paymentLinkOptions
    );
    console.log("Refund link created: ", response);
    return response;
    // return response.short_url;
  } catch (error) {
    console.error("Error creating payment link: ", error);
    throw error;
  }
};
// const demoData = {
//     userID: "123",
//     eventID: "456",
//     amount: 100,
//     service: "Demo Service",
//     name: "Demo User",
//     contactNo: "1234567890",
//     email: "tehul.iviewlabs.net",
//     roleType: "student",
//     groupSize: 5,
// }
// paymentIntegration(demoData);


module.exports = {
    paymentIntegration,
    paymentRefund
  };