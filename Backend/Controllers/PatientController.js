const {PatientsModel, User} = require('../Models/index');

const addPatient = async (req, res) => {
  try {
    const { date_of_birth, id_Number, condition, medical_history,contacts, gender, address, firstname, lastname } = req.body;

    if (!date_of_birth || !id_Number || !condition || !medical_history  || !gender || !contacts || !address || !firstname || !lastname) {

      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const newPatient = await PatientsModel.create({
        date_of_birth,
        id_Number,
        condition,
        medical_history,
        contacts,
        gender,
      address,
      firstname,
      lastname,
      created_by: req.user.user_id
    });
console.log('newPatient: ', newPatient )
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });

  } catch (error) {
    console.log('Error adding patient:', error);
    res.status(500).json({ message: 'Failed to add patient', error });
  }
};

const getAllPatients = async (req, res) => {
try{
  const patient = await PatientsModel.findAll({
    include: {
      model: User, // make sure you associated it in your model
      as: 'creator', // alias if needed
      attributes: ['firstname', 'lastname']
    }
  });
  console.log('patient', patient)

  res.status(200).json(patient);
} catch(error) {
console.error('error', error);
res.status(500).json({message:"error finding patients",error})
}
}

module.exports = {addPatient, getAllPatients}