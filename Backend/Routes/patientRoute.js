const { addPatient } = require('../Controllers/PatientController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const { roleCheck } = require('../Middleware/roleMiddleware');





const patientsRoutes = app => {
    app.post('/add-patients', authenticateToken, roleCheck(['receptionist']), addPatient)
}
module.exports = {patientsRoutes};