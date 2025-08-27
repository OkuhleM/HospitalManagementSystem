const { assignNursesToWorkStations } = require('../Controllers/NurseAssignmentController');
const { roleCheck } = require('../Middleware/roleMiddleware');
const {authenticateToken} = require("../Middleware/authMiddleware")


const assignNurse = (app) => {
app.post('/nurses/assign', authenticateToken, roleCheck(['matron']), assignNursesToWorkStations)
// app.get('/get-all-nurses',authenticateToken,roleCheck(['admin','matron']), getAllNurses)
// app.get('/get-single-nurse',authenticateToken,roleCheck(['admin','matron']), getSingleNurse)
}

module.exports = {assignNurse}