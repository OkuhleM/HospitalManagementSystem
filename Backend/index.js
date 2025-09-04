const express = require("express");
const app = express();
const port = 5000;

const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const { doctorRouter } = require("./Routes/doctorRoute");
const { AuthenticateRoutes } = require("./Routes/authRoute");
const { adminRouter } = require("./Routes/adminRoute");
const { addNursesRouter } = require("./Routes/nurseRoute");
const { receptionist } = require("./Routes/receptionistRoute");
const { patientsRoutes } = require("./Routes/patientRoute");
const { assignNurse } = require("./Routes/nurseAssignmentRoute");
const { appointments } = require("./Routes/appointmentsRoute");
const { wards } = require("./Routes/wardRoutes");
const { roomsRouter } = require("./Routes/roomsRouter");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(
  cors({
    origin: ["http://localhost:5000"],
    methods: ["POST", "GET"],
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.use(cookieParser());

app.use(express.json());
app.use(bodyParser.json());
// app.use(cors());
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

AuthenticateRoutes(app);
doctorRouter(app);
adminRouter(app);
addNursesRouter(app);
receptionist(app);
patientsRoutes(app);
assignNurse(app);
appointments(app);
wards(app)
roomsRouter(app)

app.get("/", function (req, res) {
  res.send("HSM"); // This will serve your request to '/'.
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

module.exports = app;
