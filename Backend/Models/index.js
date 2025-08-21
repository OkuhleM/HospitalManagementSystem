const User = require('./User');
const DoctorModel = require('./Doctor');
const NurseModel = require("../Models/Nurses")
const Receptionist = require("../Models/Receptionist")
const wardModel = require("../Models/Wards")


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


// wardModel.hasMany(NurseModel, { foreignKey: 'ward_id', as: 'nurses' });
// NurseModel.belongsTo(wardModel, { foreignKey: 'ward_id', as: 'ward' });

// wardModel.hasMany(DoctorModel, { foreignKey: 'ward_id', as:'doctor'});
// DoctorModel.belongsTo(wardModel, { foreignKey: 'ward_id', as: 'ward'})


// DoctorModel.hasMany(NurseModel, { foreignKey: 'assigned_doctor_id', as: 'assignedNurses' });
// NurseModel.belongsTo(DoctorModel, { foreignKey: 'assigned_doctor_id', as: 'assignedDoctor' });


module.exports = {
  User,
  DoctorModel,
  NurseModel,
  Receptionist,
 
  wardModel
};