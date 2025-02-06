const webflowService = require("../services/webflowServices");

const getCmsItems = async (req, res) => {
  const { collection_id } = req.params;

  try {
    const items = await webflowService.fetchCollectionItems(collection_id);
    res.json(items);
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    res.status(500).json({ error: "Failed to fetch CMS items" });
  }
};

const getUserInfo = async (req, res) => {
  const { userid } = req.headers; // Ensure lowercase
  console.log(process.env.SITE_ID, userid);
  
  try {
    const user = await webflowService.getUserInfoWebflow(process.env.SITE_ID, userid);
    return user; // Return user data instead of sending response
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null; // Return null if user is not found
  }
};

module.exports = { getCmsItems, getUserInfo };
