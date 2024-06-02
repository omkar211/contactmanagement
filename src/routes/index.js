const express = require("express");
const { validate } = require("express-validation");

const router = express.Router();

const { health } = require("../controllers/healthCheck/healthCheck.controller");
const contactManagementController = require("../controllers/contactManagement/contactManagement.controller");
const contactManagementValidator = require("../controllers/contactManagement/contactManagement.validator");

router.get("/health", health);
router.post(
  "/identify",
  validate(
    contactManagementValidator.contactManagement,
    {},
    {
      abortEarly: false,
      allowUnknown: true,
    }
  ),
  contactManagementController.contactManagement
);

module.exports = router;
