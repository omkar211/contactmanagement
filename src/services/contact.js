"use strict";

const DB = require("../models");
module.exports.getContacts = async (where) => {
  return await DB.contact.findAll({
    attributes: ["*"],
    where,
    raw: true,
  });
};
