// const mysql = require('mysql');
const path = require('path');
const { Sequelize } = require('sequelize');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })


const dbConnection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    // port: process.env.DB_PORT || 3306,

    dialect: 'mysql'
});


(async () => {
  try {
      await dbConnection.authenticate();
  } catch (error) {
      console.error('Unable to connect to the database:', error);
  }
})();


// module.exports = dbConnection;

  module.exports = {
    dbConnection
  }