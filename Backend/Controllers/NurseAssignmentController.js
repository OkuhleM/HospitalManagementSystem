const {
  wardModel,
  NurseModel,
  DoctorModel,
  User,
  nurseAssignment,
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
      include: [{ model: User, as: "users", where: { email: email } }]
    });
    if (!nurse) return res.status(404).json({ error: "Nurse not found" });

      let doctor = null;
    if (assigned_to_type === "doctor") {
      doctor = await DoctorModel.findOne({
        include: [{ model: User, as: "users", where: { email: doctor_email } }]
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
        assigned_by_user_id: req.user.id,
        assigned_to_type,
        assigned_doctor_id: doctor ? doctor.id : null,
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

module.exports = { assignNursesToWorkStations };
