const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const Billings = dbConnection.define(
  "Billing",
  {
    bill_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "PatientsModel",
        key: "patient_id",
      },
      onDelete: "CASCADE",
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.TINYINT,
      allowNull: false,
    },

  },
  {
    timestamps: false, // Disables Sequelize's automatic timestamps (if you use your own fields)
    tableName: "billing", // Specifies the table name in the database
  }
);

module.exports = Billings;
