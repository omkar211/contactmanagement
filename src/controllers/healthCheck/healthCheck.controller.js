/*
Created By : Omkar Sharma
Description  : Health Check.
Last Modified Date : 31-May-2024
*/

const { successResponse, errorResponse } = require("../../helpers/common");

module.exports.health = async (req, res) => {
  try {
    return successResponse(req, res, "OK", {
      uptime: process.uptime(),
      message: "Ok",
      date: new Date(),
    });
  } catch (error) {
    return errorResponse(req, res, error.message);
  }
};
