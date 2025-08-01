const User = require('./User');
const DoctorModel = require('./Doctor');


// Define associations
User.hasOne(DoctorModel, { foreignKey: 'user_id' });
DoctorModel.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  User,
  DoctorModel,
};