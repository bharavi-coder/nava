const express = require("express");
const {
  submitSupplyChainForm,
} = require("../controllers/supplyChain.controller");

const router = express.Router();

// POST: /api/supply-chain/enquiry
router.post("/", submitSupplyChainForm);


module.exports = router;
