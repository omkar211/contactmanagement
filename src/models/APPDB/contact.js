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
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      linked_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      link_precedence: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      deleted_at: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      }
    },
    {
      freezeTableName: true,
      createdAt :false,
      updatedAt :false,
      hooks: {
        beforeCreate: (record) => {
          record.dataValues.created_at = dateFormat();
          record.dataValues.updated_at = dateFormat();
        },
        beforeUpdate: (record) => {
          record.dataValues.updated_at = dateFormat();
        },
      },
    }
  );
  return contact;
};
