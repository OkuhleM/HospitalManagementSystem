const { DataTypes } = require('sequelize');
const {dbConnection} = require('../Config/database')

const Receptionist = dbConnection.define('Receptionist', {
    receptionist_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    user_id: { type: DataTypes.INTEGER, allowNull: false, unique: true }, // ForeignKey to Users
    started_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { timestamps: false,
    tableName: 'receptionist',
   });

  module.exports = Receptionist