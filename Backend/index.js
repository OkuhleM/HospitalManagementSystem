const express = require("express");
const app = express();
const port = 5000

const cors = require("cors");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const session = require('express-session');
const { doctorsRoute } = require("./Routes/doctorRoute");
const {AuthenticateRoutes} =  require("./Routes/authRoute")
const { adminRouter } = require("./Routes/adminRoute")
// const request = require('request')
// const AdminRoutes = require("./Routes/admin"

// const {database} = require("./Config/server")

const {DoctorModel} = require('./Models/Doctor');
const { HasMany } = require("sequelize");

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }));

app.use(cors())
app.use(cors(
	{
	  origin:["http://localhost:5000"],
	  methods: ["POST","GET"],
	  credentials: true,    
    optionSuccessStatus:200

	}
  ));

  app.use(cookieParser())
  
  
  app.use(express.json());
  app.use(bodyParser.json())
  // app.use(cors());
  app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  

AuthenticateRoutes(app)
doctorsRoute(app)
adminRouter(app)
// users(app)


app.get('/', function (req, res) {
  res.send('HSM'); // This will serve your request to '/'.
});

app.listen(port, () => {
    console.log(`listening on ${port}`);
  });

module.exports = app