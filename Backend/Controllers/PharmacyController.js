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

const getAllPharmacy = async (req, res) => {

try{

  const pharmacy = await pharmacy.findAll();
  console.log('pharmacy', pharmacy)

  res.status(200).json(pharmacy);

} catch(error) {

console.error('error', error);
res.status(500).json({message:"error finding pharmacy",error})
}
}

const getSinglePharmacy = async (req, res) => {

try {
      const { pharmacy_id } = req.params;
      const foundPharmacy = await pharmacy.findOne({ pharmacy_id: `${pharmacy_id}` });
      console.log(foundPharmacy)
  res.status(200).json({foundPharmacy});

} catch (error) {
  console.error('error', error);
res.status(500).json({message:"error finding patients",error})
}

}

module.exports = { createPharmacy, getAllPharmacy, getSinglePharmacy}