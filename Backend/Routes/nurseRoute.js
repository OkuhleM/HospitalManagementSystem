const {
  createNurse,
  getAllNurses,
  getSingleNurse,
} = require("../Controllers/NurseController");
const { authenticateToken } = require("../Middleware/authMiddleware");
const { roleCheck } = require("../Middleware/roleMiddleware");

const addNursesRouter = (app) => {
  app.post(
    "/add-nurse",
    authenticateToken,
    roleCheck(["admin", "matron"]),
    createNurse
  );
  app.get(
    "/get-all-nurses",
    authenticateToken,
    roleCheck(["admin", "matron"]),
    getAllNurses
  );
  app.get(
    "/get-single-nurse/:nurse_id",
    authenticateToken,
    roleCheck(["admin", "matron"]),
    getSingleNurse
  );
};

module.exports = { addNursesRouter };
