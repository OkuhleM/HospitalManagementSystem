const bcrypt = require("bcrypt");

const { User, DoctorModel } = require('../Models/index');

const { dbConnection } = require("../Config/database")

const addDoctor = async (req,res) => {

    const t = await dbConnection.transaction();

    try {
        const {first_name, last_name ,email, phone, password, specialty, license_number,} = req.body

        const ifUserExists = await User.findOne({ where: { email } });

        if(ifUserExists){
return res.status(409).json({message: " Doctor already Exists"})
        }
        
        if (!password) {
            console.log('password', password)
            return res.status(400).json({ message: 'Password is required' });
          }
        const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a user with the doctor role
        const newUser = await User.create({
          first_name,
          last_name,
          email,
          phone,
          password: hashedPassword,
          role: "doctor",
          isFirstLogin: true,
        }, { transaction: t });

        // Create a doctor user

        const newDoctor = await DoctorModel.create({
            user_id: newUser.user_id,
            specialty,
            license_number
        }, {transaction: t})

        await t.commit();

        res.status(201).json({
            message: "Doctor created successfully",
            user:  newUser,
            doctor: newDoctor,
          });
        
    } catch (error) {
         await t.rollback();
console.log("error creatng doctor: ", error)
         console.error("Error creating doctor:", error);
         res.status(500).json({ message: "Failed to create doctor", error });
    }
}

module.exports = {addDoctor}