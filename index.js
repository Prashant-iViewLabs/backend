require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const WebflowClient = require("webflow-api").WebflowClient;
const client = new WebflowClient({
  accessToken: process.env.WEBFLOW_ACCESS_TOKEN,
});

app.get("/cms-items/:collection_id", async (req, res) => {
    const { collection_id } = req.params;
  // const collection_id = "679a175129b5b3c237e7193e";
  try {
    const response = await client.collections.items.listItemsLive(
      collection_id
    );
    console.log(response.items);
    res.json(response.items);
  } catch (error) {
    console.error(
      "Error fetching CMS items:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to fetch CMS items" });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
