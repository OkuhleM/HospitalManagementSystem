const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const rooms = dbConnection.define(
  "rooms",
  {
    room_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    ward_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "wards",
        key: "ward_id"
      },
      onDelete: "CASCADE"
    },
  },
  {
    tableName: "rooms",
    timestamps: false,
  }
);

module.exports = rooms;
