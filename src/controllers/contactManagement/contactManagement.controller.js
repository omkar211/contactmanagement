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
} = require("./contactManagement.utils");

module.exports.contactManagement = async (req, res) => {
  try {
    let returnResponse = await isEntryExists(req.body) || [];
    if (returnResponse.length) {
      successResponseWithKeys((req, res, 200, "Success", { "contact": returnResponse }));
    }

    if (!(await updateData(req.body.email, req.body.phoneNumber))) {
      await createData(req.body);
    }

    returnResponse = await FetchAllData();
    return successResponseWithKeys((req, res, 200, "Success", { "contact": returnResponse }));
  } catch (Exception) {
    return errorResponse(req, res, Exception.message);
  }
};
