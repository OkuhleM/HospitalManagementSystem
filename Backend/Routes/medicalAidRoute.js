const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");
const {
  createMedicalAid,
  getMedicalAids,
  getSingleMedicalAid,
} = require("../Controllers/MedicalAidController");

const medicalAidRouter = (app) => {
  app.post(
    "/medical-aid",
    authenticateToken,
    roleCheck(["admin"]),
    createMedicalAid
  );
  app.get(
    "/medical-aid",
    authenticateToken,
    roleCheck(["receptionist", "nurse", "matron"]),
    getMedicalAids
  );
  app.get(
    "/medical-aid/:name",
    authenticateToken,
    roleCheck(["receptionist", "nurse", "matron"]),
    getSingleMedicalAid
  );
};

module.exports = { medicalAidRouter };
