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
const medicalRecords = require("./MedicalRecordsModels");
const medicalAid = require("./MedicalAidModel");
const invoices = require("./InvoicesModel");
const Payment = require("./PaymentsModel");
const Claim = require('./ClaimsModel')
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

rooms.belongsTo(wardModel, { foreignKey: "ward_id" });
wardModel.hasMany(rooms, { foreignKey: "ward_id" });

prescription.belongsTo(medication, { foreignKey: "medication_id" });
medication.hasOne(prescription, { foreignKey: "medication_id" });

// medication.belongsTo(pharmacy, { foreignKey: "pharmacy_id" });
// pharmacy.hasMany(medication, { foreignKey: "pharmacy_id" });

AppointmentModel.belongsTo(User, {
  foreignKey: "scheduled_by",
  as: "scheduledBy",
});
User.hasMany(AppointmentModel, {
  foreignKey: "scheduled_by",
  as: "appointmentsScheduled",
});

DoctorModel.hasMany(prescription, { foreignKey: "doctor_id" });
prescription.belongsTo(DoctorModel, { foreignKey: "doctor_id" });

PatientModel.hasMany(prescription, { foreignKey: "patient_id" });
prescription.belongsTo(PatientModel, { foreignKey: "patient_id" });

medication.hasMany(prescription, { foreignKey: "medication_id" });
prescription.belongsTo(medication, { foreignKey: "medication_id" });

medicalRecords.hasMany(User, { foreignKey: "user_id" });
User.belongsTo(medicalRecords, { foreignKey: "user_id" });

medicalRecords.belongsTo(PatientModel, { foreignKey: "patient_id" });
PatientModel.hasMany(medicalRecords, { foreignKey: "patient_id" });

PatientModel.belongsTo(medicalAid, {
  foreignKey: "medical_aid_id",
  as: "medicalAid",
});
medicalAid.hasMany(PatientModel, {
  foreignKey: "medical_aid_id",
  as: "patients",
});

Billings.belongsTo(PatientModel, { foreignKey: "patient_id", as: "patient" });
PatientModel.hasMany(Billings, { foreignKey: "patient_id", as: "billings" });

Billings.belongsTo(medicalAid, {
  foreignKey: "medical_aid_id",
  as: "medicalAid",
});
medicalAid.hasMany(Billings, { foreignKey: "medical_aid_id", as: "billings" });

invoices.belongsTo(PatientModel, { foreignKey: "patient_id", as: "patients" });
PatientModel.hasMany(invoices, { foreignKey: "Patient_id", as: "patients" });

invoices.belongsTo(DoctorModel, { foreignKey: "doctor_id", as: "doctors" });
DoctorModel.hasMany(invoices, { foreignKey: "doctor_id", as: "doctors" });

Payment.belongsTo(invoices, { foreignKey: "invoice_id", as: "invoices" });
invoices.hasMany(Payment, { foreignKey: "invoice_id", as: "invoices" });

Claim.belongsTo(invoices, {foreignKey: "invoice_id"});
invoices.hasMany(Claim, { foreignKey: "invoice_id"});

Claim.belongsTo(medicalAid, {foreignKey: "medical_aid_id"})
medicalAid.hasMany(Claim, { foreignKey: "medical_aid_id"})

module.exports = {
  // sequelize,
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
  pharmacy,
  PatientModel,
  medicalRecords,
  medicalAid,
  invoices,
  Payment,
  Claim
};
