const {DataTypes} = require("sequelize");
const {dbConnection} = require("../Config/database")


const wardModel = dbConnection.define('Users', {
    ward_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },

    type: {
        type: DataTypes.ENUM("pharmacy","icu","opd","other"),
        allowNull: true
    }
       
}, {
    tableName: 'wards',
    timestamps: false
});


module.exports = wardModel;
