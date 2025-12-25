const express = require("express");
const multer = require("multer");
const { submitApplicationForm } = require("../controllers/applicationForm.controller");

const router = express.Router();

// store uploads in memory to email as attachments
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 20 * 1024 * 1024 } // 20 MB each
});

// one API that accepts full wizard data + documents
router.post("/", upload.array("documents"), submitApplicationForm);

module.exports = router;
