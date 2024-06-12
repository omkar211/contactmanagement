const { Op } = require("sequelize");
const { findSingleRecord, insertData, update, findAllMatchingWithoutOrder } = require("../../services/common");
const { contact } = require("../../models");
const { errorResponse } = require("../../helpers/common");
module.exports.isEntryExists = async (payload) => {
  try {
    let whereCondition = {};

    if (payload?.email) {
      whereCondition.email = payload.email;
    }

    if (payload?.phoneNumber) {
      whereCondition.phone_number = payload.phoneNumber;
    }
    return await findSingleRecord(contact, whereCondition, ["id"]);
  }
  catch (Exception) {
    console.log("isEntryExists: ", Exception.message);
    return errorResponse(req, res, Exception.message);
  }
};

module.exports.updateData = async (payload) => {
  try {
    const emailResponse = await findSingleRecord(contact, { "email": payload?.email }, ["id", "link_precedence"]);
    const phoneResponse = await findSingleRecord(contact, { "phone_number": payload?.phoneNumber }, ["id", "link_precedence"]);
    if (phoneResponse?.link_precedence == 'secondary' && emailResponse?.link_precedence == 'secondary') {
      return false;
    }
    if (phoneResponse?.link_precedence == 'primary' && emailResponse?.link_precedence == 'primary') {
      await update(
        contact,
        { [Op.or]: [{ phone_number: payload.phoneNumber }, { linked_id: phoneResponse.id }] },
        { linked_id: emailResponse.id, link_precedence: "secondary" }
      );
      return false
    }
    return true;
  } catch (Exception) {
    console.log("updateData: ", Exception.message);
    return errorResponse(req, res, Exception.message);
  }
};

module.exports.createData = async (body) => {
  try {
    const reponseId = await findSingleRecord(contact, {
      link_precedence: "primary",
      [Op.or]: [{ "phone_number": body?.phoneNumber }, { "email": body?.email }]
    }, ["id"]);
    console.log(reponseId)
    let preparePayload = {
      "phone_number": body.phoneNumber ? body.phoneNumber : null,
      "email": body.email ? body.email : null,
      "linked_id": reponseId?.id || null,
      "link_precedence": reponseId ? "secondary" : "primary"
    }
    await insertData(contact, preparePayload);
    return true;
  } catch (Exception) {
    console.log("createData: ", Exception.message);
    return errorResponse(req, res, Exception.message);
  }
};


module.exports.fetchReturnResponse = async (payload) => {
  try {
    let where = { [Op.or]: [{ "phone_number": payload?.phoneNumber }, { "email": payload?.email }] };
    const response = await findAllMatchingWithoutOrder(contact, where, ['email', 'phone_number', 'id', 'link_precedence', 'linked_id'])
    let primaryContactId = null;
    let emails = [];
    let phoneNumbers = [];
    let secondaryContactIds = [];
    for (const ct of response) {
      if (ct.link_precedence == 'primary') {
        primaryContactId = ct.id;
      }
      else {
        secondaryContactIds.push(ct?.id);
      }
      primaryContactId = primaryContactId ? primaryContactId : ct.linked_id;
      if (ct.email) emails.push(ct.email);
      if (ct.phone_number) phoneNumbers.push(ct?.phone_number)
    }

    return {
      "primaryContatctId": primaryContactId,
      "emails": emails.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
      }),
      "phoneNumbers": phoneNumbers.filter(function (item, index, inputArray) {
        return inputArray.indexOf(item) == index;
      }),
      "secondaryContactIds": secondaryContactIds
    }
  } catch (Exception) {
    console.log("fetchReturnResponse: ", Exception.message);
    return errorResponse(req, res, Exception.message);
  }
};