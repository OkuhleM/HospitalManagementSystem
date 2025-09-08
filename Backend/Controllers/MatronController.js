const { User, NurseModel } = require("../Models/index");

const assignNurseToStation = async (req, res) => {
  try {
    const { nurse_id, assignment } = req.body;

    const nurse = await NurseModel.findByPk(nurse_id);
    console.log("nurse", nurse);
    if (!nurse) return res.status(404).json({ message: "Nurse not found" });

    nurse.station = assignment;
    await nurse.save();

    res.status(200).json({ message: "Nurse reassigned", nurse });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to assign nurse", error });
  }
};

const getAllMatrons = async (req, res) => {
  try {
    const matron = await User.findAll({ where: { role: "matron" } });
    console.log("matron", matron);

    res.status(200).json({ message: "found matron: ", matron });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding matron", error });
  }
};

const getSingleMatron = async (req, res) => {
  try {
    const { email } = req.params;
    const foundMatron = await User.findOne({
      where: { email, role: "matron" },
    });
    console.log(foundMatron);
    res.status(200).json({ message: "matron found: ", foundMatron });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding patients", error });
  }
};

module.exports = { assignNurseToStation, getAllMatrons, getSingleMatron };
