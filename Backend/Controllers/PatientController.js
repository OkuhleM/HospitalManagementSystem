const {PatientsModel} = require('../Models/index');

const addPatient = async (req, res) => {
  try {
    const { date_of_birth, id_Number, condition, medical_history,contacts, gender, address } = req.body;

    if (!date_of_birth || !id_Number || !condition || !medical_history  || !gender || !contacts || !address) {

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
      created_by: req.user.user_id
    });
console.log('newPatient: ', newPatient )
    res.status(201).json({ message: 'Patient added successfully', patient: newPatient });

  } catch (error) {
    console.log('Error adding patient:', error);
    res.status(500).json({ message: 'Failed to add patient', error });
  }
};

module.exports = {addPatient}