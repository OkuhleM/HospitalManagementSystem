const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const nurseAssignment = dbConnection.define(
  "nurseAssignments",
  {
    assignment_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    nurse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "NurseModel",
        key: "nurse_id",
      },
      onDelete: "CASCADE",
    },

    assigned_by_user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },

    assigned_to_type: {
      type: DataTypes.ENUM("doctor", "pharmacy"),
      allowNull: false,
    },

    assigned_to_doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "DoctorModel",
        key: "doctor_id",
      },
      onDelete: "CASCADE",
    },

    assigned_ward_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "wardModel",
        key: "ward_id",
      },
      onDelete: "CASCADE",
    },

    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    doctor_email: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    shift_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    shift_start: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    shift_end: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "nurse_assignments",
    timestamps: false,
  }
);

module.exports = nurseAssignment;
