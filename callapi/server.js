require("dotenv").config();

const express = require("express");
const cors = require("cors");

const supplyChainRoutes = require("./routes/supplyChain.routes");
const applicationFormRoutes = require("./routes/applicationForm.routes");



const app = express();

app.use(cors());
app.use(express.json());

// Supply Chain Module Routes
app.use("/api/supply-chain", supplyChainRoutes);
app.use("/api/application-form", applicationFormRoutes);
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
