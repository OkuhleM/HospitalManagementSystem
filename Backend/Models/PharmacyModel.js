const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const pharmacy = dbConnection.define(
  "pharmacy",
  {
    pharmacy_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    location: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    contact: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "pharmacy",
    timestamps: false,
  }
);

module.exports = pharmacy;
