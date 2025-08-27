const {
  wardModel,
  NurseModel,
  DoctorModel,
  User,
  nurseAssignment,
  AuditLog,
} = require("../Models/index");

const { dbConnection } = require("../Config/database");

const assignNursesToWorkStations = async (req, res) => {
  const t = await dbConnection.transaction();
  try {
    const {
      nurse_id,
      assigned_by_user_id,
      assigned_to_type,
      assigned_doctor_id,
      assigned_ward_id,
      email,
      doctor_email,
      shift_date,
      shift_start,
      shift_end,
      notes,
    } = req.body;

    const nurse = await NurseModel.findOne({
      include: [{ model: User, as: "users", where: { email: email } }],
    });
    if (!nurse) return res.status(404).json({ error: "Nurse not found" });

    let doctor = null;
    if (assigned_to_type === "doctor") {
      doctor = await DoctorModel.findOne({
        include: [{ model: User, as: "users", where: { email: doctor_email } }],
      });
      if (!doctor) return res.status(404).json({ error: "Doctor not found" });
    }

    if (assigned_to_type === "ward" && assigned_ward_id) {
      const ward = await wardModel.findByPk(assigned_ward_id, {
        transaction: t,
      });
      if (!ward) {
        await t.rollback();
        return res.status(404).json({ message: "Assigned ward not found" });
      }
    }

    const newAssignedNurse = await nurseAssignment.create(
      {
        nurse_id: nurse.nurse_id,
        assigned_by_user_id: req.user.user_id,
        assigned_to_type,
        assigned_doctor_id: doctor ? doctor.doctor_id : null,
        assigned_ward_id,
        email,
        doctor_email,
        shift_date,
        shift_start,
        shift_end,
        notes,
      },
      { transaction: t }
    );
    console.log("newAssignedNurse: ", newAssignedNurse);
    await t.commit();

    return res.status(200).json({
      message: "Nurse successfully assigned",
      assignment: newAssignedNurse,
    });
  } catch (error) {
    console.log("error: ", error);
    res.status(500).json({ error: error });
  }
};

nurseAssignment.addHook("afterCreate", async (assignment, options) => {
  await AuditLog.create({
    user_id: options.user_id || null,
    action: "ASSIGN_NURSE",
    target_table: "nurse_assignments",
    target_id: assignment.assignment_id,
    new_value: JSON.stringify(assignment.toJSON()),
  });
});

nurseAssignment.addHook("afterUpdate", async (assignment, options) => {
  await AuditLog.create({
    user_id: options.user_id || null,
    action: "UPDATE_ASSIGNMENT",
    target_table: "nurse_assignments",
    target_id: assignment.assignment_id,
    new_value: JSON.stringify(assignment.toJSON()),
    old_value: JSON.stringify(options.fieldsBeforeUpdate || {}),
  });
});

module.exports = { assignNursesToWorkStations };
