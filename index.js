require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cmsRoutes = require("./routes/cmsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/cms", cmsRoutes);
app.use("/payment", paymentRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


