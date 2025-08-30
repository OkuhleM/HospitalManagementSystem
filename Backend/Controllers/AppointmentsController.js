const {
  AppointmentModel,
  DoctorModel,
 
  wardModel,
} = require("../Models/index");
const PatientModel = require('../Models/Patient')

const createAppointments = async (req, res) => {
  try {
    const {
      patient_id,
      doctor_id,
      scheduled_by,
      notes,
      diagnosis,
      treatment,
      prescription,
      ward_id,
      appointment_datetime,
      status,
    } = req.body;

    const doctor = await DoctorModel.findOne({ where: { doctor_id } });
    if (!doctor) return res.status(404).json({ error: "Doctor not found" });

    const patient = await PatientModel.findOne({ where: { patient_id } });
    if (!patient) return res.status(404).json({ error: "Patient not found" });

    const ward = await wardModel.findByPk(ward_id);
    if (!ward) return res.status(404).json({ error: "Ward not found" });

    const scheduleNewAppointment = await AppointmentModel.create({
      patient_id: patient.patient_id,
      doctor_id: doctor.doctor_id,
      scheduled_by: req.user.user_id,
      notes,
      diagnosis,
      treatment,
      prescription,
      ward_id: ward / ward_id,
      appointment_datetime,
      status,
    });

    const scheduledAppointment = await AppointmentModel.findOne({
      where: { appointment_id: scheduleNewAppointment.appointment_id },
      include: [
        { model: DoctorModel, include: [{ model: User, as: "users" }] },
        { model: PatientModel },
        { model: wardModel },
      ],
    });

    console.log("Scheduled Appointment", scheduleNewAppointment);
    return res.status(201).json({ message: "Scheduled", scheduledAppointment });
  } catch (error) {
    console.log(error, "error:");
    res.status(500).json({ message: "not approved", error: error });
  }
};

module.exports = { createAppointments };
