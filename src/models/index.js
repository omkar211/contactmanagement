"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};
const { NODE_ENV, databases: DBs } = require("../../config");

const databases = Object.keys(DBs);

for (let i = 0; i < databases.length; ++i) {
  const database = databases[i];
  const dbPath = DBs[database];

  // Store the database connection in our db object
  db[database] = new Sequelize(dbPath.DATABASE, null, null, {
    dialect: dbPath.DIALECT,
    dialectOptions: {
      useUTC: false, // for reading from database
      timezone: "+05:30",
      connectTimeout: 60000,
    },
    timezone: "+05:30",
    port: dbPath.PORT,
    logging: NODE_ENV === "local" ? console.log : false,
    replication: {
      read: [
        {
          host: dbPath.read.HOST,
          username: dbPath.read.USERNAME,
          password: dbPath.read.PASSWORD,
        },
      ],
      write: {
        host: dbPath.write.HOST,
        username: dbPath.write.USERNAME,
        password: dbPath.write.PASSWORD,
      },
    },
    pool: {
      max: dbPath.MAX_DB_CONNECTIONS,
      min: dbPath.MIN_DB_CONNECTIONS,
      acquire: 60000,
      idle: 30000,
    },
  });
}

fs.readdirSync(path.join(__dirname, "APPDB"))
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, "APPDB", file))(
      db.APPDB,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
