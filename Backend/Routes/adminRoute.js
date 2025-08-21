
const { authenticateToken } = require('../Middleware/authMiddleware')
const {roleCheck} = require('../Middleware/roleMiddleware')

const {registerUser, getAllUsers, getSingleUser} = require("../Controllers/UserController");

const adminRouter = app => {
app.post('/register-admin',registerUser);


app.get('/get-all-users',authenticateToken, roleCheck(['admin']), getAllUsers)
app.get('/get-single-user/:email', authenticateToken, roleCheck(['admin']), getSingleUser)

}

module.exports={
    adminRouter
}