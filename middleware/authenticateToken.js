const cmsController = require("../controllers/cmsController");

const authenticateUser = async (req, res, next) => {
  const userId = req.headers["userid"]; // Ensure lowercase for consistency

  if (!userId) return res.sendStatus(403); // Reject if no userId is provided

  try {
    // Fetch user info from Webflow CMS
    const user = await cmsController.getUserInfo(req, res);
    if (!user) return res.sendStatus(403); // If user not found, reject request

    req.userInfo = user; // Attach user data to req object
    next();
  } catch (error) {
    console.error("User authentication error:", error);
    res.sendStatus(500);
  }
};

module.exports = authenticateUser;
