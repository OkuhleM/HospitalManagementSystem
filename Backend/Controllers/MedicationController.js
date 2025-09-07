const { medication } = require("../Models/index");

const addMedication = async (req, res) => {
  try {
    const { name, quantity, expiry_date } = req.body;

    const createMedication = await medication.create({
      name,
      quantity,
      expiry_date,
    });
    console.log('createMedication', createMedication)
    return res.status(200).json({message: 'medication created: ', createMedication})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error });
  }
};

const getMedication = async (req, res) => {

try{

  const medications = await medication.findAll();
  console.log('nurses', medications)

  res.status(200).json(medications);

} catch(error) {

console.error('error', error);
res.status(500).json({message:"error finding medications",error})
}
}

const getSingleMedication = async (req, res) => {

try {
      const { medication_id } = req.params;
      const medicationsFound = await NurseModel.findOne({ medication_id: `${medication_id}` });
      console.log(medicationsFound)
  res.status(200).json({medicationsFound});

} catch (error) {
  console.error('error', error);
res.status(500).json({message:"error finding Medication",error})
}

}


module.exports = { addMedication, getMedication, getSingleMedication };
