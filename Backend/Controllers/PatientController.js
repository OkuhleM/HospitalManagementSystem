const PatientsModel = require("../Models/Patient");

const addPatient = async (req, res) => {
  if (!req.body) {
    console.warn(
      "addPatient: req.body is undefined — check express.json() middleware and Content-Type header"
    );
    return res
      .status(400)
      .json({
        message:
          "Missing request body. Send JSON with Content-Type: application/json",
      });
  }
  try {
    const {
      date_of_birth,
      id_Number,
      medical_condition,
      medical_history,
      contacts,
      gender,
      address,
      firstname,
      lastname,
    } = req.body;

    console.log("DOB: ", date_of_birth, medical_condition);

    if (
      ![
        date_of_birth,
        id_Number,
        medical_condition ?? "",
        medical_history ?? "",
        gender,
        contacts,
        address,
        firstname,
        lastname,
      ].every((v) => v !== undefined && v !== null && String(v).trim() !== "")
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    const newPatient = await PatientsModel.create({
      date_of_birth,
      id_Number,
      medical_condition,
      medical_history,
      contacts,
      gender,
      address,
      firstname,
      lastname,
    });

    res
      .status(201)
      .json({ message: "Patient added successfully", patient: newPatient });
  } catch (error) {
    console.error("Error adding patient:", error);
    res.status(500).json({ message: "Failed to add patient", error: error });
  }
};

const getAllPatients = async (req, res) => {
  try {
    const patient = await PatientsModel.findAll();
    console.log("patient", patient);

    res.status(200).json(patient);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding patients", error });
  }
};

const getSinglePatient = async (req, res) => {
  try {
    const { id_Number } = req.params;
    const foundPatient = await PatientsModel.findOne({
      id_Number: `${id_Number}`,
    });
    console.log(foundPatient);
    res.status(200).json({ foundPatient });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding patients", error });
  }
};

module.exports = { addPatient, getAllPatients, getSinglePatient };
