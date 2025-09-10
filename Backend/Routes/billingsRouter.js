const { patientsBillings, getAllAccounts,  getAPatientsAccount, } = require('../Controllers/BillingController')
const {authenticateToken} = require('../Middleware/authMiddleware')
const { roleCheck } = require('../Middleware/roleMiddleware')


const accountSettling = app => {
app.post('/bills', authenticateToken, roleCheck(['admin']) , patientsBillings)
app.get('/bills', authenticateToken, roleCheck(['receptionist']),getAllAccounts)
app.get('/bills/:bill_id', authenticateToken, roleCheck(['receptionist']),getAPatientsAccount)

}

module.exports = {accountSettling}