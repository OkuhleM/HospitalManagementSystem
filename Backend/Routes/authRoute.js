const { body } = require('express-validator');
const {LogIn} = require("../Controllers/AuthController");
// const {roleCheck} = require("../Middleware/roleMiddleware")
// const {roleCheck} = require("../Middleware/roleMiddleware")

const {ChangePassword} = require("../Controllers/passwordChange");
// const { authenticateToken } = require('../Middleware/authMiddleware');

const AuthenticateRoutes = (app) => {

  app.post('/login',
  [        body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  ],

  LogIn

)
}

module.exports = { AuthenticateRoutes};
