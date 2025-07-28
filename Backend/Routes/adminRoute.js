// const {dbConnection} = require('../Config/database')
const { body } = require('express-validator');

const { authenticateToken } = require('../Middleware/authMiddleware')
const {roleCheck} = require('../Middleware/roleMiddleware')

const {registerUser} = require("../Controllers/UserController")

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

    app.post('/create-doctor', authenticateToken, roleCheck('admin'),async (req,res)=>{
    // Logic for adding doctor
    
    try {
          
            
        } catch (error) {
            console.log('error', error);

            res.status(401).json({error: error})
        }
        

        res.send("docter added successfully")
    })
}

module.exports={
    adminRouter
}