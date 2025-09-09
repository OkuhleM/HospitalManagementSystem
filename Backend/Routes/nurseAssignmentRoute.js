const {
  assignNursesToWorkStations,
} = require("../Controllers/NurseAssignmentController");
const {
  getAllMatrons,
  getSingleMatron,
} = require("../Controllers/MatronController");
const { roleCheck } = require("../Middleware/roleMiddleware");
const { authenticateToken } = require("../Middleware/authMiddleware");

const assignNurse = (app) => {

  app.post(
    "/matron",
    authenticateToken,
    roleCheck(["matron"]),
    assignNursesToWorkStations
  );
  app.get(
    "/matron/:email",
    authenticateToken,
    roleCheck(["admin", "matron"]),
    getSingleMatron
  );
  app.get(
    "/matron",
    authenticateToken,
    roleCheck(["admin", "matron"]),
    getAllMatrons
  );
};

module.exports = { assignNurse };
