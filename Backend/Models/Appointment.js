const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");
const {AuditLog} = require('./AuditLogsModel')

const AppointmentModel = dbConnection.define(
  "Appointments",
  {
    appointment_id: {
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
        model: "Doctors",
        key: "doctor_id",
      },
      onDelete: "CASCADE",
    },

    scheduled_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Users",
        key: "user_id",
      },
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    diagnosis: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    treatment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    prescription: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ward_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: "wards",
        key: "ward_id",
      },
      onDelete: "CASCADE",
    },
    appointment_datetime: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM(
        "scheduled",
        "checked_in",
        "in_consultation",
        "completed",
        "cancelled",
        "no_show"
      ),
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "appointments",
  },

);
AppointmentModel.afterCreate(async (appointment, options) => {
  await AuditLog.create({
    user_id: appointment.scheduled_by,
    action: "CREATE_APPOINTMENT",
    details: `Appointment scheduled for patient_id=${appointment.patient_id} with doctor_id=${appointment.doctor_id}`,
  });
});

AppointmentModel.afterUpdate(async (appointment, options) => {
  await AuditLog.create({
    user_id: appointment.scheduled_by,
    action: "UPDATE_APPOINTMENT",
    details: `Appointment updated (ID=${appointment.id})`,
  });
});

module.exports = AppointmentModel;
