const { addPatient, getAllPatients } = require('../Controllers/PatientController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const { roleCheck } = require('../Middleware/roleMiddleware');





const patientsRoutes = app => {
    app.post('/add-patients', authenticateToken, roleCheck(['receptionist']), addPatient);
    app.get('/get-all-patients', authenticateToken, roleCheck(['admin, doctors,matron,nurse,receptionist'], getAllPatients))
}
module.exports = {patientsRoutes};