"use strict";

const { Sequelize } = require("sequelize");
const {
  databases: { APPDB },
} = require("../config");

const sequelize = new Sequelize(APPDB.DATABASE, null, null, {
  dialect: APPDB.DIALECT,
  port: APPDB.PORT,
  replication: {
    read: [
      {
        host: APPDB.read.HOST,
        username: APPDB.read.USERNAME,
        password: APPDB.read.PASSWORD,
      },
    ],
    write: {
      host: APPDB.write.HOST,
      username: APPDB.write.USERNAME,
      password: APPDB.write.PASSWORD,
    },
  },
});

module.exports = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to database has been established successfully.");
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};
