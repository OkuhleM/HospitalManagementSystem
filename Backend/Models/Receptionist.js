const { DataTypes } = require('sequelize');
const {dbConnection} = require('../Config/database')

const Receptionist = dbConnection.define('Receptionist', {

    receptionist_id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },

      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      },

    start_date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, 
  { timestamps: false,
    tableName: 'receptionists',
   });

  module.exports = Receptionist