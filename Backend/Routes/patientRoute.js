const { addPatient, getAllPatients, getSinglePatient } = require('../Controllers/PatientController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const { roleCheck } = require('../Middleware/roleMiddleware');

const patientsRoutes = app => {
    app.post('/add-patients', authenticateToken, roleCheck(['receptionist']), addPatient);
    app.get('/get-all-patients', authenticateToken, roleCheck(' doctors,matron,nurse,receptionist'), getAllPatients)
    app.get('/get-single-patient/:id_Number', authenticateToken, roleCheck('doctors, nurse, receptionist, matron'), getSinglePatient)
}
module.exports = {patientsRoutes};