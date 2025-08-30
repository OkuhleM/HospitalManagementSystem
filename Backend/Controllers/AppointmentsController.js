const {
  AppointmentModel,
  NurseModel,
  DoctorModel,
  PatientModel,
  User,
} = require("../Models/index");
const AuditLog = require("./AuditLogsModel");

const createAppointments = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      nurse_id,
      scheduled_by,
      notes,
      diagnosis,
      treatment,
      prescriptions,
      ward_id,
      appointment_datetime,
      status,
    } = req.body;

    const nurse = await NurseModel.findByPk(nurse_id);
    if (!nurse) return res.status(404).json({ error: "Nurse not found" });

    const doctor = await DoctorModel.findByPk(doctor_id);
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const patient = await PatientModel.findByPk(patient_id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const scheduleNewAppointment = await AppointmentModel.create({
      patient_id,
      doctor_id,
      nurse_id,
      scheduled_by: req.user.user_id,
      notes,
      diagnosis,
      treatment,
      prescriptions,
      ward_id: ward_id,
      appointment_datetime,
      status,
    });
    console.log("Scheduled Appointment", scheduleNewAppointment);
    return res
      .status(200)
      .json({ message: " Scheduled", scheduleNewAppointment });
  } catch (error) {
    console.log(error, "error:");
    res.status(500).json({ message: "not approved", error: error });
  }
};

module.exports = { createAppointments };
