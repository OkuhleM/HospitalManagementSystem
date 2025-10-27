const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");
const { fetchWeeklyStats} = require("../Controllers/getWeeklyStats")

const stats = (app) => {
//   app.post("/ward", authenticateToken, roleCheck(["admin"]), addWards);
//   app.get("/ward", authenticateToken, roleCheck(["admin"]), getAllWards);
  app.get(
    "/weekly-stats",
    authenticateToken,
    roleCheck(["admin"]),
    fetchWeeklyStats
  );
};

module.exports = { stats };
