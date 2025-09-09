const {medicalAid} = require('../Models/index')

const createMedicalAid = async (req,res) => {
    const { name, plan} = req.body
try {
    const addMedicalAid = await medicalAid.create({
        name, plan
    })
    console.log("add medical aid", addMedicalAid)
    res.status(200).json({message: " added successfully: ", addMedicalAid})
} catch (error) {
  console.error("error: ", error)  
  res.status(500).json({message: "you have an error: ", error: error})
}

}

const getMedicalAids = async (req,res) => {

    try {
        const availableMedicalAids = await medicalAid.findAll()
        res.status(200).json({message: "added :0)", availableMedicalAids})
    } catch (error) {
      console.error("error: ", err) 
      res.status(500).json({message: "you have an error: ", error}) 
    }

}

const getSingleMedicalAid = async (req,res) => {
const { name} = req.params

try {
    const foundMedicalAids = await medicalAid.findOne({name: `${name}`})
    res.status(200).json({message: " found aid: ", foundMedicalAids})
} catch (error) {
    consolele.error("error: ", error)
    res.status(200).json({message: " medical not found: ", error})
}
}
module.exports = {createMedicalAid, getMedicalAids, getSingleMedicalAid}