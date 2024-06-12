const express = require("express");
const router = express.Router();

const { health } = require("../controllers/healthCheck/healthCheck.controller");
const contactManagementController = require("../controllers/contactManagement/contactManagement.controller");
const contactManagementValidator = require("../controllers/contactManagement/contactManagement.validator");

router.get("/health", health);
router.post(
  "/identify",
  contactManagementValidator.contactManagement,
  contactManagementController.contactManagement
);

module.exports = router;
