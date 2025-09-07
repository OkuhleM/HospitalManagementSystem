const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const medication = dbConnection.define(
  "medications",
  {
    medication_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    expiry_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  
  },
  {
    tableName: "medication",
    timestamps: false,
  }
);

module.exports = medication;
