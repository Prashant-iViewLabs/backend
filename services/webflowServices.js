const { WebflowClient } = require("webflow-api");
const { webflowAccessToken } = require("../config/config");

const client = new WebflowClient({
  accessToken: webflowAccessToken,
});

const fetchCollectionItems = async (collectionId) => {
  const response = await client.collections.items.listItemsLive(collectionId);
  return response.items;
};

const getUserInfoWebflow = async (siteId, userId) => {
  const response = await client.users.get(siteId, userId);
  return response;
};

module.exports = { fetchCollectionItems, getUserInfoWebflow };
