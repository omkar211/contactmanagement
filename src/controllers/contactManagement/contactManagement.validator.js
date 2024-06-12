const Joi = require('joi');
const { errorResponse } = require('../../helpers/common');
module.exports.contactManagement = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().allow(null, "").optional().trim(),
    phoneNumber: Joi.string().allow(null, "").optional().trim(),
  });
  const { error } = schema.validate(req.body);
  if (error || ([null, ""].includes(req?.body?.email) && [null, ""].includes(req?.body?.phoneNumber))) {
    return errorResponse(req, res, error?.message || "Please enter valid data");
  }
  next()
};
