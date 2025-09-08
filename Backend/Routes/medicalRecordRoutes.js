const { authenticateToken} = require('../Middleware/authMiddleware');
const { roleCheck } = require('../Middleware/roleMiddleware');
const { createMedicalRecords, getPatientsMedicalRecords, getSinglePatientsRecord } = require('../Controllers/MedicalRecordsController')

const patientsMedicalRecord = app => {

app.post('/medical-records/patients-medical-record', authenticateToken, roleCheck(['receptionist','doctor']), createMedicalRecords)
app.get('/medical-records/get-patient-record', authenticateToken, roleCheck(['receptionist', 'doctor']), getPatientsMedicalRecords)
app.get('/medical-records/get-single-patient-record', authenticateToken, roleCheck(['receptionist', 'doctor']), getSinglePatientsRecord)
} 

module.exports = { patientsMedicalRecord}   