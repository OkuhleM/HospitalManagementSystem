const bcrypt = require("bcrypt");
const path = require("path")

const User = require("../Models/User");
require('dotenv').config({ path: path.resolve(__dirname, '../.env') })

const registerUser = async (req,res) => {

    const {first_name, last_name,email, phone, password,role} = req.body

//     const validRoles = ['doctor', 'nurse', 'receptionist', 'matron']; // admin can't create another admin
//   if (!validRoles.includes(role)) {
//     return res.status(400).json({ message: 'Invalid role' });
//   }

    try {

        const existingUser = await User.findOne({ where: { email } });
        console.log('existingUser', existingUser)
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

    console.log('the user', existingUser)

        const hashedPassword = await bcrypt.hash(password, 10)
        console.log('hashedPassword', hashedPassword)

        const newUser = await User.create({
                first_name,
                last_name,
                email,
                phone,
                password: hashedPassword,
                role,
            });
            console.log("new-user",newUser);
        
        res.status(201).send({newUser, message: "user created"});



    } catch (error) {
        console.log('error', error)
        return res.status(400).json({message: "Server Error"})
    }


}

module.exports = { registerUser}