const { Op } = require("sequelize");
const { getContacts } = require("../../services/contact");
const { findSingleRecord, insertData, update } = require("../../services/common");

module.exports.isEntryExists = async (payload) => {
  let whereCondition = {};

  if (payload?.email) {
    whereCondition.email = payload.email;
  }

  if (payload?.phoneNumber) {
    whereCondition.phonenumber = payload.phoneNumber;
  }

  return await getContacts(whereCondition);
};

module.exports.updateData = async (payload) => {
  const emailResponse = findSingleRecord(contact, { email: payload.email }, "id, linkPrecedence");
  const phoneResponse = findSingleRecord(contact, { phoneNumber: payload.phoneNumber }, "id, linkPrecedence");
  if (!emailResponse || !phoneResponse) {
    return false;
  }
  if (emailResponse?.linkPrecedence == "secondary" || phoneResponse?.linkPrecedence == "secondary") {
    return true;
  }
  await update(
    contact,
    { [Op.or]: [{ phoneNumber: body.phoneNumber }], linkedId: phoneResponse.id },
    { linkedId: emailResponse.id, linkPrecedence: "secondary" },
  );
  return true;
};

module.exports.createData = async (body) => {
  const getID = findSingleRecord(contact, { linkPrecedence: "primary" }, {
    [Op.or]: [{ email: body.email }, { phoneNumber: body.phoneNumber }]
  }) || null;
  let preparePayload = {
    "phoneNumber": body.phoneNumber,
    "email": body.email,
    "linkedId": getID,
    "linkPrecedence": getID ? "secondary" : "primary"
  }
  await insertData(contact, preparePayload);
  return true;
};
