const webflowService = require("../services/webflowServices");
const emailService = require("../services/mailServices");

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

const addChild = async (req, res, next) => {
  const { body } = req;
  try {
    // Add registration logic here
    const response = await webflowService.addCollectionItemWebflow(
      child_collection_id,
      body
    );
    res.json(response);
    console.log("response", response);

    let mailData = {
      name: body.fieldData.name,
      parentEmail: body.fieldData["parent-email"],
      dob: body.fieldData["birth-date"],
      standard: body.fieldData["standard-2"],
      schoolName: body.fieldData["school-name"],
    };
    emailService.sendAddChildMail(mailData);
  } catch (error) {
    console.error("Error adding registration:", error);
    res.status(500).json({ error: "Failed to add registration" });
  }
};

const updateChild = async (req, res) => {
  const { body } = req;
  const id = req.query.childid;
  console.log(body, id);

  try {
    const response = await webflowService.updateCollectionItemWebflow(
      child_collection_id,
      id,
      body
    );
    res.json(response);
    let mailData = {
      name: body.fieldData.name,
      dob: body.fieldData["birth-date"],
      standard: body.fieldData["standard-2"],
      schoolName: body.fieldData["school-name"],
    };
    emailService.sendEditChildMail(mailData, body.fieldData["parent-email"]);
  } catch (error) {
    console.error("Error updating child:", error);
    res.status(500).json({ error: "Failed to update child" });
  }
};

const deleteChild = async (req, res) => {
  const childId = req.query.childid;
  console.log("childId", childId);
  const userEmail = req.headers["useremail"];

  try {
    const response = await webflowService.deleteCollectionItemWebflow(
      child_collection_id,
      childId
    );

    res.json(response);

    // Uncomment and modify as needed
    // let mailData = { name: response.fieldData.name };
    // emailService.sendDeleteChildMail(mailData, userEmail);
  } catch (error) {
    console.error("Delete error:", error);

    if (error.statusCode === 409) {
      return res.status(409).json({
        message: `Cannot delete: This item is still referenced by '${error.body.details[0].conflicts[0].ref.name}' in collection '${error.body.details[0].conflicts[0].ref.collectionName}'.`,
      });
    }

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

const getEventIdBySlug = async (req, res) => {
  let slug = req.query.slug;
  try {
    const items = await webflowService.fetchCollectionItemsBySlug(
      event_collection_id,
      slug
    );
    res.json({ eventId: items.items[0].id });
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
    let myRegistrationsWithEventDetails = await Promise.all(
      myRegistrations.map(async (item) => {
        console.log(item);

        let eventDetails = await getEventDetailsById(
          item.fieldData["event-id"]
        );
        let childDetails = await getChildDetailsById(
          item.fieldData["child-ids"]
        ); // Assuming there's a function to get child details

        return {
          ...item,
          eventDetails: eventDetails,
          childDetails: childDetails,
        };
      })
    );

    res.json(myRegistrationsWithEventDetails);
  } catch (error) {
    console.error("Error fetching CMS items:", error);
    res.status(500).json({ error: "Failed to fetch CMS items" });
  }
};
const getEventDetailsById = async (eventId) => {
  let eventDetails = await webflowService.fetchCollectionItemsById(
    event_collection_id,
    eventId
  );
  let data = {
    id: eventDetails.id,
    name: eventDetails.fieldData.name,
    registrationFee: eventDetails.fieldData["registration-fee"],
    image: eventDetails.fieldData.image["url"],
  };
  return data;
};
const getChildDetailsById = async (childIds) => {
  if (!childIds || childIds.length === 0) return []; // Handle empty or undefined child IDs

  // If childIds is an array, fetch details for each child
  let childDetails = await Promise.all(
    childIds.map(async (childId) => {
      let childData = await webflowService.fetchCollectionItemsById(
        child_collection_id, // Assuming child details are stored in a separate collection
        childId
      );

      return {
        id: childData.id,
        name: childData.fieldData.name,
        standard: childData.fieldData["standard-2"],
        schoolName: childData.fieldData["school-name"],
      };
    })
  );

  return childDetails;
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

const deleteRegistration = async (req, res) => {
  const { registrationId } = req.query.registrationid;
  try {
    // Add registration logic here
    const response = await webflowService.deleteCollectionItemWebflow(
      registration_collection_id,
      registrationId
    );
    res.json(response);
  } catch (error) {
    console.error("Error adding registration:", error);
    res.status(500).json({ error: "Failed to add registration" });
  }
};

const cancelRegistration = async (req, res) => {
  const { registrationId } = req.query.registrationid;
  const { body } = req;
  try {
    const response = await webflowService.updateCollectionItemWebflow(
      registration_collection_id,
      registrationId,
      body
    );
    res.json(response);
  } catch (error) {
    console.log("Error Cancelling Registration");
    res.status(500).json({ error: "Failed to cancel registration" });
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
  getEventIdBySlug,
  deleteRegistration,
  cancelRegistration,
};
