const {registerUser} = require("../Controllers/UserController")
const { body } = require('express-validator');
const { authenticateToken } = require('../Middleware/authMiddleware');
const {roleCheck} = require("../Middleware/roleMiddleware")
const express = require('express');
const router = express.Router();


    router.post('/register', authenticateToken, roleCheck('admin'),
    
    [
        body('first_name').notEmpty().withMessage('Name is required'),
        body('last_name').notEmpty().withMessage('Last Name is required'),
        body('email').isEmail().withMessage('Invalid email'),
        body('phone').notEmpty().withMessage(" Phone Number cannot be empty"),
        body('password_hash').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
        body('role').isIn(['admin', 'doctor', 'nurse', 'receptionist']).withMessage('Invalid role'),
    ],
    
    registerUser
);


module.exports = { router}

