const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const AuditLog = dbConnection.define(
  "AuditLog",
  {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },

    target_table: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    target_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    new_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    old_value: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "audit_logs",
    timestamps: false,
  }
);

module.exports = AuditLog;
