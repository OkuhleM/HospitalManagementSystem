const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const medicalAid = dbConnection.define(
  "Billing",
  {
    medical_aid_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    plan: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },

  {
    timestamps: false, // Disables Sequelize's automatic timestamps (if you use your own fields)
    tableName: "MedicalAid", // Specifies the table name in the database
  }
);

module.exports = medicalAid;
