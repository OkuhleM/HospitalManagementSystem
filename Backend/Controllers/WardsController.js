const { wardModel } = require("../Models/index");

const addWards = async (req, res) => {
  try {
    const { name, capacity, type } = req.body;

    if (!name || !capacity || !type) {
      return res.status(501).json({ message: "All fields are required" });
    }
    // const wardType =  ['ward', 'pharmacy', 'icu', 'medical wards', 'surgical wards', 'maternity wards']

    const createWards = await wardModel.create({
      name,
      capacity,
      type,
    });
    console.log("created: ", createWards);
    res.status(201).json({ message: " succesfully added", ward: createWards });
  } catch (error) {
    console.error("error: ", error);
    res.status(501).json({ error: error.error });
  }
};
module.exports = { addWards };
