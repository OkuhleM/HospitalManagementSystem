const { DataTypes } = require("sequelize");
const { dbConnection } = require("../Config/database");

const DoctorModel = dbConnection.define(
  "Doctors",
  {
    doctor_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Users",
        key: "user_id",
      },
      onDelete: "CASCADE",
    },

    specialty: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    license_number: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW, // Automatically sets the timestamp
    },
   
    notes: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
     ward_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "wards",
        key: "ward_id",
      },
    },
  },
  {
    timestamps: false, // Disables Sequelize's automatic timestamps (if you use your own fields)
    tableName: "Doctors", // Specifies the table name in the database
  }
);

module.exports = DoctorModel;
