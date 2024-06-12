/*
Created By : Omkar Sharma
Description  : contact management.
Last Modified Date : 02-june-2024
*/

const {
  successResponseWithKeys,
  errorResponse
} = require("../../helpers/common");
const {
  isEntryExists,
  updateData,
  createData,
  fetchReturnResponse,
} = require("./contactManagement.utils");

module.exports.contactManagement = async (req, res) => {
  try {
    let returnResponse = await isEntryExists(req.body);
    if (returnResponse) {
      return await successResponseWithKeys(req, res, 200, "success", { "contact": await fetchReturnResponse(req.body) })
    }
    if ((await updateData(req.body))) {
      await createData(req.body);
    }
    return await successResponseWithKeys(req, res, 200, "success", { "contact": await fetchReturnResponse(req.body) })
  } catch (Exception) {
    return errorResponse(req, res, Exception.message);
  }
};
