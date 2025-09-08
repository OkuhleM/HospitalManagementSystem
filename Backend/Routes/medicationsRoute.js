const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");
const {
  addMedication,
  getMedication,
  getSingleMedication,
} = require("../Controllers/MedicationController");

const medicationsRouter = (app) => {
  app.post(
    "/medication/add-medication",
    authenticateToken,
    roleCheck(["admin"]),
    addMedication
  );
  app.get(
    "/medication",
    authenticateToken,
    roleCheck(["admin"]),
    getMedication
  );
  app.get(
    "/medication/:medication_id",
    authenticateToken,
    roleCheck(["admin"]),
    getSingleMedication
  );
};

module.exports = { medicationsRouter };
