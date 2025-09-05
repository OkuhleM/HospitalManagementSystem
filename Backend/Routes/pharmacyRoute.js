const { roleCheck } = require("../Middleware/roleMiddleware");
const { authenticateToken} = require('../Middleware/authMiddleware');
const { createPharmacy, getAllPharmacy, getSinglePharmacy } = require("../Controllers/PharmacyController");

const pharmacyRouter = app => {
app.post('/pharmacy/add-pharmacy', authenticateToken, roleCheck(['admin']), createPharmacy)
app.get('/pharmacy/get-all-pharmacies', authenticateToken, roleCheck(['admin', 'nurse']), getAllPharmacy);
app.get('/pharmacy/get-single-pharmacy/:pharmacy_id', authenticateToken, roleCheck(['nurse', 'admin']), getSinglePharmacy)
} 
module.exports = {pharmacyRouter}