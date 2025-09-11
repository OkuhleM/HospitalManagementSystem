const { createPayment, getPayments, getPaymentsByInvoice} = require('../Controllers/PaymentsController')
const {authenticateToken} = require('../Middleware/authMiddleware')
const { roleCheck} = require('../Middleware/roleMiddleware')


const accountPayments = app => {

app.post('/payments', authenticateToken, roleCheck(['receptionist', 'admin']), createPayment)
app.get('/payments', authenticateToken, roleCheck(['receptionist', 'admin']), getPayments)
app.get('/payments/:invoice_id', authenticateToken, roleCheck(['receptionist', 'admin']), getPaymentsByInvoice)
}

module.exports = {accountPayments}