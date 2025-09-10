const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const prescription = dbConnection.define(
  "prescriptions",
  {
    prescription_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patient_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "patients",
        key: "patient_id",
      },
      onDelete: "CASCADE",
    },
    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "doctors",
        key: "doctor_id",
      },
      onDelete: "CASCADE",
    },

    medication_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "medication",
        key: "medication_id",
      },
      onDelete: "CASCADE",
    },
    dosage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    frequency: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    tableName: "prescriptions",
    timestamps: false,
  }
);

module.exports = prescription;
