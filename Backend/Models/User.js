const {DataTypes} = require("sequelize");
const {dbConnection} = require("../Config/database")

const User = dbConnection.define('Users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    first_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    last_name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(15),
        allowNull: false,
        unique: true

    },

    password: {
        type: DataTypes.STRING(255),
        allowNull: false // Store hashed password
    },
    role: {
        type: DataTypes.ENUM('admin', 'doctor', 'nurse', 'receptionist'),
        allowNull: false
    },
    isFirstLogin: {
        type: DataTypes.BOOLEAN,
        defaultValue: true // Mark true for new users
    },
}, {
    tableName: 'Users',
    timestamps: false
});


module.exports = User;
