const User = require("./User");
const DoctorModel = require("./Doctor");
const NurseModel = require("../Models/Nurses");
const Receptionist = require("../Models/Receptionist");
const wardModel = require("../Models/Wards");
const nurseAssignment = require("../Models/NurseAssignmentsModels");
const AuditLog = require("./AuditLogsModel");
const AppointmentModel = require("./Appointment");
const PatientModel = require("./Patient");
const Billings = require("./BillingModel");
const rooms = require("./RoomsModel");
const medication = require("./MedicationModel");
const prescription = require("./PrescriptionsModel");
const pharmacy = require("./PharmacyModel");

// User Profile
User.hasOne(DoctorModel, {
  foreignKey: "user_id",
  as: "doctors",
  onDelete: "CASCADE",
});

DoctorModel.belongsTo(User, { foreignKey: "user_id", as: "users" });

User.hasOne(AuditLog, {
  foreignKey: "user_id",
  as: "audits",
  onDelete: "CASCADE",
});
AuditLog.belongsTo(User, { foreignKey: "user_id", as: "users" });

User.hasOne(NurseModel, {
  foreignKey: "user_id",
  as: "nurses",
  onDelete: "CASCADE",
});
NurseModel.belongsTo(User, { foreignKey: "user_id", as: "users" });

User.hasOne(Receptionist, {
  foreignKey: "user_id",
  as: "receptionist",
  onDelete: "CASCADE",
});
Receptionist.belongsTo(User, { foreignKey: "user_id", as: "users" });

// Nurse Profile === ward profile === Assignments

NurseModel.hasMany(nurseAssignment, {
  foreignKey: "nurse_id",
  as: "nurseassignments",
});
nurseAssignment.belongsTo(NurseModel, { foreignKey: "nurse_id", as: "nurses" });

wardModel.hasMany(nurseAssignment, {
  foreignKey: "ward_id",
  as: "nurseassignments",
});
nurseAssignment.belongsTo(wardModel, { foreignKey: "ward_id", as: "wards" });

wardModel.hasMany(DoctorModel, { foreignKey: "ward_id", as: "doctors" });
DoctorModel.belongsTo(wardModel, { foreignKey: "ward_id", as: "wards" });

DoctorModel.hasMany(nurseAssignment, {
  foreignKey: "assigned_doctor_id",
  as: "assignedNurses",
});
nurseAssignment.belongsTo(DoctorModel, {
  foreignKey: "assigned_doctor_id",
  as: "assignedDoctors",
});

AppointmentModel.belongsTo(PatientModel, { foreignKey: "patient_id" });
PatientModel.hasMany(AppointmentModel, { foreignKey: "patient_id" });

AppointmentModel.belongsTo(DoctorModel, { foreignKey: "doctor_id" });
DoctorModel.hasMany(AppointmentModel, { foreignKey: "doctor_id" });

// AppointmentModel.belongsTo(NurseModel, { foreignKey: "nurse_id" });
// NurseModel.hasMany(AppointmentModel, { foreignKey: "nurse_id" });

AppointmentModel.belongsTo(wardModel, { foreignKey: "ward_id" });
wardModel.hasMany(AppointmentModel, { foreignKey: "ward_id" });

Billings.belongsTo(PatientModel, { foreignKey: "patient_id" });
PatientModel.hasMany(Billings, { foreignKey: "patient_id" });

rooms.belongsTo(wardModel, { foreignKey: "ward_id" });
wardModel.hasMany(rooms, { foreignKey: "ward_id" });

prescription.belongsTo(medication, { foreignKey: "medication_id" });
medication.hasOne(prescription, { foreignKey: "medication_id" });

medication.belongsTo(pharmacy, { foreignKey: "pharmacy_id" });
pharmacy.hasMany(medication, { foreignKey: "pharmacy_id" });

AppointmentModel.belongsTo(User, { foreignKey: "scheduled_by", as: "scheduledBy" });
User.hasMany(AppointmentModel, { foreignKey: "scheduled_by", as: "appointmentsScheduled" });

module.exports = {
  User,
  DoctorModel,
  NurseModel,
  Receptionist,
  nurseAssignment,
  wardModel,
  AuditLog,
  AppointmentModel,
  Billings,
  rooms,
  medication,
  prescription,
};
