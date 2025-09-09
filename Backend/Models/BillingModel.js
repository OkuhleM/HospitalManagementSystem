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
        model: "PatientModel",
        key: "patient_id",
      },
      onDelete: "CASCADE",
    },

    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    billing_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    medical_aid_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "medicalAid",
        key: "medical_aid_id",
      },
      onDelete: "CASCADE",
    },
    paid_by_medical_aid: {
      type: DataTypes.TINYINT,
      allowNull: true,
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
