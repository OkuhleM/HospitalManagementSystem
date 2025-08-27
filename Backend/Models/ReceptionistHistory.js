const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const ReceptionistHistoryModel = dbConnection.define(
  "ReceptionistHistory",
  {
    record_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: { type: DataTypes.INTEGER, allowNull: false },
    started_at: { type: DataTypes.DATE },
    ended_at: { type: DataTypes.DATE },
  },
  { timestamps: false, tableName: "receptionHistory" }
);

module.exports = ReceptionistHistoryModel;
