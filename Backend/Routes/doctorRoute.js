const {dbConnection} = require('../Config/database')
const {DoctorModel} = require('../Models/Doctor')
const bcrypt = require('bcrypt')



const doctorsRoute= app => {

app.post('/admin/create-doctor', async (req,res)=>{
    
    const {doctor_id,name,email,password,specialty,license_number,created_at }=req.body
    try {

if( !name || !email || !password || !specialty || !license_number || !created_at) {
       return res.status(400).send("All Fields are required!!");
       
    }

    const hashPassword = await bcrypt.hash(password, 10)

    const newDoctor = await DoctorModel.create({
        doctor_id,
        name,
        email,
        password: hashPassword,
        specialty,
        license_number,
        created_at
    });
    res.status(201).json({ message: 'Doctor added successfully', newDoctor});


    } catch (error) {
        console.log('error', error)
        res.status(500).json({ message: 'Failed to add doctor' });

    }
})


}

module.exports = {doctorsRoute}