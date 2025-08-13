const { DataTypes } = require('sequelize');
const {dbConnection} = require('../Config/database')

const NurseModel = dbConnection.define('Nurse', {
    nurse_id: { 
      type: DataTypes.INTEGER, 
      autoIncrement: true, 
      primaryKey: true },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'user_id'
        },
        onDelete: 'CASCADE'
      },
    assignment: { 
      type: DataTypes.STRING(255),
        allowNull: false,

     }, 
    assigned_to: {
        type: DataTypes.ENUM("doctor", "pharmacy"),
        allowNull: false,
      },
      shift_date: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      }
  }, {
    timestamps: false,
    tableName: 'Nurses'
   });

  module.exports = NurseModel