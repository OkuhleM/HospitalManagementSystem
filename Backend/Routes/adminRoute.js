// const {dbConnection} = require('../Config/database')
const { body } = require('express-validator');

const { authenticateToken } = require('../Middleware/authMiddleware')
const {roleCheck} = require('../Middleware/roleMiddleware')

const {registerUser} = require("../Controllers/UserController");
const { addDoctor } = require('../Controllers/AdminControllers');

const adminRouter = app => {
app.post('/register-admin',

    [
        body('email').isEmail(),
        body('password').isLength({ min: 6 }),
        body('role').equals('admin')
      ],
      registerUser
    );


app.get('/secure-data', authenticateToken, (req,res)=>{
        res.send('This is protected data')
    })

    app.post('/add-doctor', authenticateToken, roleCheck(['admin']), addDoctor)
}

module.exports={
    adminRouter
}