const { medicalRecords, User, PatientModel } = require("../Models/index");

const createMedicalRecords = async (req, res) => {
  try {
    const {
      id_Number,
      user_id,
      patient_id,
      visit_date,
      record_type,
      note,
      attached_files,
      created_at,
      updated_at,
    } = req.body;

    const patient = await PatientModel.findOne({ id_Number });

    if (!patient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    //    const attachments = req.files.map(file => ({
    //   fileName: file.originalname,
    //   filePath: `/uploads/${file.filename}`,
    //   uploadedAt: new Date()
    // }));

    const addNewMedicalRecords = await medicalRecords.create({
      user_id: req.user?.user_id || null,
      patient_id: patient.patient_id,
      visit_date,
      record_type,
      note,
      attached_files,
      created_at,
      updated_at,
    });

    console.log("addNewMedicalRecords", addNewMedicalRecords);
    return res
      .status(200)
      .json({ message: "added successfully", addNewMedicalRecords });
  } catch (error) {
    console.error("error: ", error);
    return res
      .status(500)
      .json({ message: " error in adding the medical record", error });
  }
};

const getPatientsMedicalRecords = async (req, res) => {
  try {
    const patientsMedicalRecord = await medicalRecords.findAll();
    console.log("patientsMedicalRecord: ", patientsMedicalRecord);

    res.status(200).json(patientsMedicalRecord);
  } catch (error) {
    console.error("error", error);
    return res
      .status(200)
      .json({
        message: " error finding patients medical record",
        error: error,
      });
  }
};

const getSinglePatientsRecord = async (req, res) => {
  try {
    const { id_Number } = req.params;

    const foundPatient = await medicalRecords.findOne({
      id_Number: `${id_Number}`,
    });
    console.log(foundPatient);
    res.status(200).json({ message: "found patient:", foundPatient });
  } catch (error) {
    console.error("error", error);
    return res
      .status(200)
      .json({
        message: " error finding patients medical record",
        error: error,
      });
  }
};

module.exports = {
  createMedicalRecords,
  getPatientsMedicalRecords,
  getSinglePatientsRecord,
};
