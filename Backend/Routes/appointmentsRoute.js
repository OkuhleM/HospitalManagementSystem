const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");
const {
  createAppointments,
  getPatientsAppointment,
  getAppointments,
} = require("../Controllers/AppointmentsController");

const appointments = (app) => {
  app.post(
    "/appointment",
    authenticateToken,
    roleCheck(["nurse", "doctor", "receptionist"]),
    createAppointments
  );
  app.get(
    "/appointment/:patient_id",
    authenticateToken,
    roleCheck(["doctor", "receptionist"]),
    getPatientsAppointment
  );
  app.get(
    "/appointment",
    authenticateToken,
    roleCheck(["doctor", "receptionist"]),
    getAppointments
  );
};

module.exports = { appointments };
