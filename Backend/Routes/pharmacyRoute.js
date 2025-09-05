const { roleCheck } = require("../Middleware/roleMiddleware");
const { authenticateToken} = require('../Middleware/authMiddleware');
const { createPharmacy } = require("../Controllers/PharmacyController");

const pharmacyRouter = app => {
app.post('/pharmacy/add-pharmacy', authenticateToken, roleCheck(['admin']), createPharmacy)

} 
module.exports = {pharmacyRouter}