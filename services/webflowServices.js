const { WebflowClient } = require("webflow-api");
const { webflowAccessToken } = require("../config/config");

const client = new WebflowClient({
  accessToken: webflowAccessToken,
});

const fetchCollectionItems = async (collectionId, userEmail) => {
  const response = await client.collections.items.listItemsLive(collectionId);
  if (userEmail) {
    return response.items.filter(
      (item) => item.fieldData["parent-email"] === userEmail
    );
  }
  return response.items;
};

const fetchCollectionItemsById = async (collectionId, itemId) => {
  const response = await client.collections.items.getItemLive(collectionId, itemId);
  return response;
}

const getUserInfoWebflow = async (siteId, userId) => {
  const response = await client.users.get(siteId, userId);
  return response;
};

const addCollectionItemWebflow = async (collection_id, body) => {
  const response = await client.collections.items.createItemLive(
    collection_id,
    body
  );
  return response;
};

const updateCollectionItemWebflow = async (collection_id, item_id, body) => {
  const response = await client.collections.items.updateItemLive(
    collection_id,
    item_id,
    body
  );
};

const deleteCollectionItemWebflow = async (collection_id, item_id) => {
  const response = await client.collections.items.deleteItemLive(
    collection_id,
    item_id
  );
};
module.exports = {
  fetchCollectionItems,
  getUserInfoWebflow,
  addCollectionItemWebflow,
  updateCollectionItemWebflow,
  deleteCollectionItemWebflow,
  fetchCollectionItemsById
};
