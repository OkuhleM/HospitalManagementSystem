const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

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
        model: "PatientsModel",
        key: "patient_id",
      },
      onDelete: "CASCADE",
    },

    doctor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "DoctorModel",
        key: "doctor_id",
      },
      onDelete: "CASCADE",
    },
    nurse_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "NurseModel",
        key: "nurse_id",
      },
      onDelete: "CASCADE",
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
        allowNull: false
    },
    ward_id: {
        type: DataTypes.INTEGER,
        references: {
            model: "wardModel",
            key: "ward_id"
        },
        onDelete: "CASCADE"
    },
    appointment_datetime: {
        type: DataTypes.DATE,
        allowNull: false
    },
    status: {
        type: DataTypes.ENUM('scheduled', 'checked_in', 'in_consultation', 'completed', 'cancelled', 'no_show'),
        allowNull: true
    }
  },
  {
    timestamps: false, // Disables Sequelize's automatic timestamps (if you use your own fields)
    tableName: "appointments", // Specifies the table name in the database
  }
);

module.exports = AppointmentModel;
