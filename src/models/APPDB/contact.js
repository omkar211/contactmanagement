const { dateFormat } = require("../../helpers/date");

module.exports = (sequelize, DataTypes) => {
  const contact = sequelize.define(
    "contact",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      phonenumber: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      linkedid: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      linkprecedence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      freezeTableName: true,
      hooks: {
        beforeCreate: (record) => {
          record.dataValues.createdAt = dateFormat();
          record.dataValues.updatedAt = dateFormat();
        },
        beforeUpdate: (record) => {
          record.dataValues.updatedAt = dateFormat();
        },
      },
    }
  );
  return contact;
};
