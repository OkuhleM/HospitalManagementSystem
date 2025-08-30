const { authenticateToken } = require('../Middleware/authMiddleware')
const {roleCheck} = require('../Middleware/roleMiddleware')
const {createAppointments} = require('../Controllers/AppointmentsController')

const appointments = app => {
app.post('/appointment/schedule',authenticateToken, roleCheck(['nurse','doctor','receptionist']), createAppointments)
}

module.exports = {appointments}