const {createInvoices, getInvoices, getSingleInvoice} = require('../Controllers/InvoicesController')
const { authenticateToken} = require('../Middleware/authMiddleware')
const { roleCheck } = require('../Middleware/roleMiddleware')

const invoicedBills = app => {

    app.post('/invoices', authenticateToken, roleCheck(['admin']), createInvoices);
    app.get('/invoices', authenticateToken, roleCheck(['admin','receptionist']), getInvoices)
    app.get('/invoices/:invoice', authenticateToken, roleCheck(['admin','receptionist']), getSingleInvoice)

}

module.exports = { invoicedBills}