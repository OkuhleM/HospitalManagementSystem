const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");
const {
  addWards,
  getAllWards,
  getSingleWards,
} = require("../Controllers/WardsController");

const wards = (app) => {
  app.post("/ward", authenticateToken, roleCheck(["admin"]), addWards);
  app.get("/ward", authenticateToken, roleCheck(["admin"]), getAllWards);
  app.get(
    "/ward/:email",
    authenticateToken,
    roleCheck(["admin"]),
    getSingleWards
  );
};

module.exports = { wards };
