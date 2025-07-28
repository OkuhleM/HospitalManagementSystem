// const mysql = require('mysql');
const path = require('path');
const { Sequelize } = require('sequelize');

require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

// const dbConnnection = mysql.createConnection({
//     host     : process.env.HOST,
//     user     : process.env.USER,
//     password : process.env.PASSWORD,
//     database : process.env.DATABASE
//   });

// console.log(process.env.HOST,process.env.USER,process.env.PASSWORD,process.env.DATABASE)

//   dbConnnection.connect(function(err) { 
//     console.log(process.env.HOST,process.env.USER,process.env.PASSWORD,process.env.DATABASE)

//     if (err) {
       
//       return err
//     };
//     console.log("connected")
//   });



const dbConnection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql',
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