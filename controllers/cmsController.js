const webflowService = require("../services/webflowServices");
const child_collection_id = "67976038a0ce992a5e2f0b53";
const registration_collection_id = "679a175129b5b3c237e7193e";
const event_collection_id = "6791e81436f04a362036787d";

// User Apis start
const getUserInfo = async (req, res) => {
  const { userid } = req.headers; // Ensure lowercase

  try {
    const user = await webflowService.getUserInfoWebflow(
      process.env.SITE_ID,
      userid
    );
    return user; // Return user data instead of sending response
  } catch (error) {
    console.error("Error fetching user info:", error);
    return null; // Return null if user is not found
  }
};

// User Apis end

// Child Api start
const getChildDetails = async (req, res) => {
  const userEmail = req.headers["useremail"];
  try {
    const items = await webflowService.fetchCollectionItems(
      child_collection_id,
      userEmail
    );
    res.json(items);
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    res.status(500).json({ error: "Failed to fetch CMS items" });
  }
};

const addChild = async (req, res) => {
  const { body } = req;
  try {
    // Add registration logic here
    const response = await webflowService.addCollectionItemWebflow(
      child_collection_id,
      body
    );
    res.json(response);
  } catch (error) {
    console.error("Error adding registration:", error);
    res.status(500).json({ error: "Failed to add registration" });
  }
};

const updateChild = async (req, res) => {
  const { body, id } = req;
  try {
    const response = await webflowService.updateCollectionItemWebflow(
      child_collection_id,
      id,
      body
    );
    res.json(response);
  } catch (error) {
    console.error("Error updating child:", error);
    res.status(500).json({ error: "Failed to update child" });
  }
};

const deleteChild = async (req, res) => {
  const childId = req.query.childid;
  try {
    const response = await webflowService.deleteCollectionItemWebflow(
      child_collection_id,
      childId
    );
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to delete child" });
  }
};

// Child Apis end
// Event Apis start
const getEvents = async (req, res) => {
  let eventStatus = req.query.eventstatus;
  console.log(eventStatus);

  try {
    const items = await webflowService.fetchCollectionItems(
      event_collection_id
    );
    let eventStatusItems = items.filter(
      (item) => item.fieldData["event-status"] === eventStatus
    );
    res.json(eventStatusItems);
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    res.status(500).json({ error: "Failed to fetch CMS items" });
  }
};

// Event Apis end

// Registration Apis start
const getMyRegistrations = async (req, res) => {
  let userId = req.headers["userid"];
  try {
    const items = await webflowService.fetchCollectionItems(
      registration_collection_id
    );
    let myRegistrations = items.filter(
      (item) => item.fieldData["user-id"] === userId
    );
    res.json(myRegistrations);
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    res.status(500).json({ error: "Failed to fetch CMS items" });
  }
};

const addRegistration = async (req, res) => {
  const { body } = req;
  try {
    // Add registration logic here
    const response = await webflowService.addCollectionItemWebflow(
      registration_collection_id,
      body
    );
    res.json(response);
  } catch (error) {
    console.error("Error adding registration:", error);
    res.status(500).json({ error: "Failed to add registration" });
  }
};

// Registration Apis end

module.exports = {
  getUserInfo,
  getChildDetails,
  addChild,
  updateChild,
  deleteChild,
  addRegistration,
  getMyRegistrations,
  getEvents,
};
