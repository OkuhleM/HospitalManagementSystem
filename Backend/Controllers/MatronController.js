const NurseModel = require("../Models/Nurses");

const assignNurseToStation = async (req, res) => {
    try {
      const { nurse_id, assignment } = req.body;
  
      const nurse = await NurseModel.findByPk(nurse_id);
  console.log('nurse', nurse)
      if (!nurse) return res.status(404).json({ message: 'Nurse not found' });
  
      nurse.station = assignment;
      await nurse.save();
  
      res.status(200).json({ message: 'Nurse reassigned', nurse });
    } catch (error) {
        console.log('error', error)
      res.status(500).json({ message: 'Failed to assign nurse', error });
    }
  };
  
  module.exports = { assignNurseToStation };