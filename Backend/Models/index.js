const User = require('./User');
const DoctorModel = require('./Doctor');
const NurseModel = require("../Models/Nurses")
const Receptionist = require("../Models/Receptionist")
const PatientsModel = require("../Models/Patient")


// Define associations
User.hasOne(DoctorModel, { foreignKey: 'user_id',
    as: 'doctor',
  onDelete: 'CASCADE'
 });
DoctorModel.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

User.hasOne(NurseModel, {
  foreignKey: 'user_id',
  as: 'nurse',
  onDelete: 'CASCADE'
});
NurseModel.belongsTo(User, { foreignKey: 'user_id', as: 'user'});

User.hasOne(Receptionist, {
  foreignKey: 'user_id',
  as: 'receptionist',
  onDelete: 'CASCADE'
});
Receptionist.belongsTo(User, { foreignKey: 'user_id', as: 'user'})

// User.hasMany(PatientsModel, { foreignKey: 'created_by',
//   as: 'patient',
// onDelete: 'CASCADE'
// });
// PatientsModel.belongsTo(User, { foreignKey: 'created_by', as: 'receptionist'})

User.hasMany(PatientsModel, { foreignKey: 'created_by', as: 'createdPatients' });
PatientsModel.belongsTo(User, { foreignKey: 'created_by', as: 'creator' });


module.exports = {
  User,
  DoctorModel,
  NurseModel,
  Receptionist,
  PatientsModel
};