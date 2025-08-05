const {createNurse, getAllNurses } = require("../Controllers/NurseController")
const {authenticateToken} = require("../Middleware/authMiddleware")
const { roleCheck } = require("../Middleware/roleMiddleware")

const addNursesRouter = (app) => {
app.post('/add-nurse', authenticateToken, roleCheck(['admin', 'matron']), createNurse)
app.get('/',authenticateToken,roleCheck(['admin','matron']), getAllNurses)
}

module.exports = {addNursesRouter}