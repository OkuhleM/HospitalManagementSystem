const User = require("./User");
const DoctorModel = require("./Doctor");
const NurseModel = require("../Models/Nurses");
const Receptionist = require("../Models/Receptionist");
const wardModel = require("../Models/Wards");
const nurseAssignment = require("../Models/NurseAssignmentsModels");

// User Profile
User.hasOne(DoctorModel, {
  foreignKey: "user_id",
  as: "doctors",
  onDelete: "CASCADE",
});

DoctorModel.belongsTo(User, { foreignKey: "user_id", as: "users" });

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

module.exports = {
  User,
  DoctorModel,
  NurseModel,
  Receptionist,
  nurseAssignment,
  wardModel,
};
