const { addDoctor, getAllDoctors, getSingleDoctor } = require('../Controllers/AdminControllers');
const {authenticateToken} = require('../Middleware/authMiddleware');
const { roleCheck } = require('../Middleware/roleMiddleware');



const doctorRouter = app => {

    app.post('/add-doctor', authenticateToken, roleCheck(['admin']), addDoctor)
    app.get('/get-all-doctors', authenticateToken, roleCheck(['admin']), getAllDoctors)
    app.get('/get-single-doctor/:license_number', authenticateToken, roleCheck(['admin']), getSingleDoctor)

}

module.exports = {doctorRouter}