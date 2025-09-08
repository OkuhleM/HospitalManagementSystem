const {
  createReceptionist,
  getAllReceptionists,
  getSingleReceptionists,
} = require("../Controllers/ReceptionistController");
const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");

const receptionist = (app) => {
  app.post(
    "/receptionist",
    authenticateToken,
    roleCheck(["admin"]),
    createReceptionist
  );
  app.get(
    "/receptionist",
    authenticateToken,
    roleCheck(["admin"]),
    getAllReceptionists
  );
  app.get(
    "/receptionist/:email",
    authenticateToken,
    roleCheck(["admin"]),
    getSingleReceptionists
  );
};

module.exports = { receptionist };
