const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");
const {
  getAllPrescriptions,
  getSinglePrescription,
  createPrescritions,
} = require("../Controllers/PrescriptionsController");

const medicalPrecriptions = (app) => {
  app.post(
    "/prescription",
    authenticateToken,
    roleCheck(["nurse", "doctor"]),
    createPrescritions
  );
  app.get(
    "prescription/:prescription_id",
    authenticateToken,
    roleCheck(["receptionist", "doctor", "nurse"]),
    getSinglePrescription
  );
  app.get(
    "prescription",
    authenticateToken,
    roleCheck(["receptionist", "doctor", "nurse"]),
    getAllPrescriptions
  );
};
module.exports = { medicalPrecriptions };
