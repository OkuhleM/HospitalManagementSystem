const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const Claim = dbConnection.define(
  "claims",
  {
    claim_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    invoice_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "invoices",
        key: "invoice_id",
      },
      onDelete: "CASCADE",
    },
    insurance_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "medical_aid",
        key: "medical_aid_id",
      },
      onDelete: "CASCADE",
    },
    claim_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("submitted", "approved", "rejected", "pending"),
      defaultValue: "pending",
    },
    submitted_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    processed_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    tableName: "claims",
    timestamps: false,
  }
);

module.exports = Claim;