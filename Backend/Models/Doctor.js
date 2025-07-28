const { DataTypes } = require('sequelize');
const {dbConnection} = require('../Config/database')

const DoctorModel = dbConnection.define('Doctors', {
    doctor_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    specialization: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true, // Validates that it's a proper email
        },
    },
    password: {
        type: DataTypes.STRING(255), // Store hashed passwords
        allowNull: false,
    },
    isFirstLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true, // Indicates whether the doctor needs to change their password
    },
    created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW, // Automatically sets the timestamp
    },
}, {
    timestamps: false, // Disables Sequelize's automatic timestamps (if you use your own fields)
    tableName: 'Doctors', // Specifies the table name in the database
});

module.exports = {DoctorModel};


