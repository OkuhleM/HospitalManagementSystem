const {DataTypes} = require("sequelize");
const {dbConnection} = require("../Config/database")

const PatientsModel = dbConnection.define('Patients', {

  patient_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },

  date_of_birth: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  id_Number: {
    type: DataTypes.STRING(13),
    allowNull: false,
    unique: true
  },
 
  medical_condition:{
type: DataTypes.TEXT,
allowNull: false

  },
  medical_history:{
type: DataTypes.TEXT,
allowNull: false
  },
  contacts: {
    type: DataTypes.STRING(20),
    allowNull: false
  },
  gender: {
    type: DataTypes.ENUM('Male', 'Female', 'Other'),
    allowNull: false
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true
  },

  firstname: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  lastname: {
    type: DataTypes.STRING(255),
    allowNull: false

  }
}, {
  timestamps: true,
  tableName: 'patients'
});

module.exports = PatientsModel;
