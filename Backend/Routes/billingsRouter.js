const { patientsBillings } = require('../Controllers/BillingController')
const {authenticateToken} = require('../Middleware/authMiddleware')
const { roleCheck } = require('../Middleware/roleMiddleware')


const accountSettling = app => {
app.post('/bills', authenticateToken, roleCheck(['admin']), patientsBillings)
// app.get('/bills', authenticateToken, roleCheck(['receptionist'], get))

}

module.exports = {accountSettling}