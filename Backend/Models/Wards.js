const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const wardModel = dbConnection.define(
  "Users",
  {
    ward_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
name: {
type: DataTypes.STRING(255),
allowNull: false
},
capacity: {
type: DataTypes.INTEGER,
allowNull: false
},
    type: {
      type: DataTypes.ENUM("ward","pharmacy", "icu", "opd", "other"),
      allowNull: true,
    },
  },
  {
    tableName: "wards",
    timestamps: false,
  }
);

module.exports = wardModel;
