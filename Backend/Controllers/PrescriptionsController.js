const {
  prescription,
  PatientModel,
  DoctorModel,
  medication,
} = require("../Models/index");

const createPrescritions = async (req, res) => {
  const { id_Number, license_number, medication_id, dosage, frequency, duration } =
    req.body;

  const patient = await PatientModel.findOne({
    where: {  id_Number: `${ id_Number}` },
  });

  const doctor = await DoctorModel.findOne({
    where: { license_number: `${license_number}` },
  });

  const medicationId = await medication.findOne({
    where: { medication_id: `${medication_id}` },
  });

 if(!doctor){ return res.status(404).json({message: "medication not found"})}

    if (!medicationId) {
      return res.status(404).json({ message: "medicationId not found", medicationId });
    }
    if (!patient) {
      return res.status(404).json({ message: "patient not found" });}

      try {
    const addprescriptions = await prescription.create({
      patient_id: patient.patient_id,
      doctor_id: doctor.doctor_id,
      medication_id,
      dosage,
      frequency,
      duration,
    });
    console.log(" added prescription: ", addprescriptions);
    return res
      .status(200)
      .json({
        message: "added prescription successfullly: ",
        addprescriptions,
      });
  } catch (error) {
    console.error("error: ", error);
    return res
      .status(500)
      .json({ message: "error creating prescriptions", error });
  }
};

const getAllPrescriptions = async (req, res) => {
  try {
    const prescriptions = await prescription.findAll();
    console.log("prescriptions", prescriptions);

    res.status(200).json({message: "found successfully", prescriptions});
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding prescription", error });
  }
};

const getSinglePrescription = async (req, res) => {
  try {
    const { prescription_id } = req.params;
    const foundPrescription = await prescription.findOne({ where: {prescription_id} });
    console.log(foundPrescription);
    res.status(200).json({message: "found prescription: ", foundPrescription });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding foundPrescription", error });
  }
};
module.exports = { createPrescritions, getAllPrescriptions, getSinglePrescription };
