const { authenticateToken} = require('../Middleware/authMiddleware')
const { roleCheck } = require('../Middleware/roleMiddleware')
const { createClaim, updateClaimStatus,getAllClaims,getASingleClaim} = require('../Controllers/ClaimsController');



const medicalAidClaims = app => {

app.post("/claims", authenticateToken,roleCheck(['admin','receptionist']), createClaim);
app.get("/claims", authenticateToken, roleCheck(['admin','receptionist']), getAllClaims);
app.get('/claims/:claim_id', authenticateToken, roleCheck(['admin','receptionist']), getASingleClaim)
app.put('/claims/:claim_id', authenticateToken, roleCheck(['admin','receptionist']), updateClaimStatus)
}

module.exports = { medicalAidClaims}