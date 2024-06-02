const { Joi } = require("express-validation");

module.exports.contactManagement = {
  body: Joi.object({
    email: Joi.string().allow(null).optional(),
    phoneNumber: Joi.number().allow(null).optional(),
  }),
};
