const { authenticateToken } = require('../Middleware/authMiddleware')
const {roleCheck} = require('../Middleware/roleMiddleware')
const {addWards} = require('../Controllers/WardsController')

const wards = app => {
app.post('/add-wards',authenticateToken, roleCheck(['admin']), addWards)
}

module.exports = {wards}    