const { createReceptionist } = require('../Controllers/ReceptionistController');
const { authenticateToken } = require('../Middleware/authMiddleware');
const { roleCheck } = require('../Middleware/roleMiddleware');

const receptionist = app => {

app.post('/add', authenticateToken, roleCheck(['admin']), createReceptionist)
}

module.exports = {receptionist}