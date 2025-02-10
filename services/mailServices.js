const sgMail = require("@sendgrid/mail");

const { sendgridApiKey } = require("../config/config");

sgMail.setApiKey(sendgridApiKey);

const sendAddChildMail = async (body) => {
  try {
    console.log("maily body", body);

    const { name, parentEmail, dob, standard, schoolName } = body;

    const msg = {
      to: parentEmail, // Change to your recipient email
      from: process.env.SENDGRID_SENDER_EMAIL,
      template_id: "d-774b589f876b4f3ab81c50fbddcc36b3", // Replace with your SendGrid template ID
      dynamic_template_data: {
        name: name,
        parentEmail: parentEmail,
        dob: dob,
        standard: standard,
        schoolName: schoolName,
      },
    };

    await sgMail.send(msg);
    // res
    //   .status(200)
    //   .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    // res.status(500).json({ success: false, error: "Failed to send email." });
  }
};

const sendEditChildMail = async (body) => {
  try {
    const { name, dob, standard, schoolName } = body;

    const msg = {
      to: user_email, // Change to your recipient email
      from: process.env.SENDGRID_SENDER_EMAIL,
      template_id: "d-6cacc6dea3d74d4cb4350c127edf9300", // Replace with your SendGrid template ID
      dynamic_template_data: {
        name: name,
        dob: dob,
        standard: standard,
        schoolName: schoolName,
      },
    };

    await sgMail.send(msg);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
};

const sendDeleteChildMail = async (body) => {
  try {
    const { name } = body;

    const msg = {
      to: user_email, // Change to your recipient email
      from: process.env.SENDGRID_SENDER_EMAIL,
      template_id: "d-1139013fbc254fec98769400fd427efd", // Replace with your SendGrid template ID
      dynamic_template_data: {
        name: name,
      },
    };

    await sgMail.send(msg);
    res
      .status(200)
      .json({ success: true, message: "Email sent successfully!" });
  } catch (error) {
    console.error("SendGrid Error:", error.response?.body || error);
    res.status(500).json({ success: false, error: "Failed to send email." });
  }
};

module.exports = { sendAddChildMail, sendEditChildMail, sendDeleteChildMail };
