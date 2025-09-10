const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const invoices = dbConnection.define(
  "invoices",
  {
    invoice_id: {
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
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("unpaid", "paid", "pending"),
      allowNull: true,
    },
    payment_method: {
      type: DataTypes.ENUM("cash", "card", "medical_aid"),
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets the timestamp
    },

    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets the timestamp
    },
  },
  {
    timestamps: false, // Disables Sequelize's automatic timestamps (if you use your own fields)
    tableName: "invoices", // Specifies the table name in the database
  }
);

module.exports = invoices;
