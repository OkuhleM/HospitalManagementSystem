const { pharmacy } = require('../Models/index')

const createPharmacy = async (req, res) => {

    try {
        
        const {name, location, contact } = req.body

const addToPharmacy = await pharmacy.create({
    name,
    location,
    contact
})
    console.log("added to pharmacy: ", addToPharmacy)
    return res.status(200).json({ message: " added succesfully", addToPharmacy})    
    } catch (error) {
        console.error(error)
        return res.status(500).json({error: error})
    }

}

module.exports = { createPharmacy}