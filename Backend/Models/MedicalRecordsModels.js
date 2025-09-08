const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const medicalRecords = dbConnection.define(
  "medicalRecords",
  {
    record_id: {
       type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    patient_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      references: {
        model: "PatientsModel",
        key: "patient_id",
      },
      onDelete: "CASCADE",
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },

    visit_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    record_type: {
      type: DataTypes.ENUM(
        "consult_note",
        "nursing_note",
        "prescription",
        "lab_result",
        "radiology",
        "discharge_summary",
        "other"
      ),
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    attached_files: {
      type: DataTypes.JSON,
    },
  },
  {
    tableName: "medical_records",
    timestamps: false,
  }
);

module.exports = medicalRecords;
