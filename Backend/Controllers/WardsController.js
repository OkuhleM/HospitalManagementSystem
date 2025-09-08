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

const getAllWards = async (req, res) => {
  try {
    const availableWards = await wardModel.findAll();
    console.log("availableWards", availableWards);

    res.status(200).json(availableWards);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding availableWards", error });
  }
};

const getSingleWards = async (req, res) => {
  try {
    const { ward_id } = req.params;
    const foundWard = await User.findOne({ ward_id: `${ward_id}` });
    console.log(foundWard);
    res.status(200).json({ foundWard });
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding foundWard", error });
  }
};

module.exports = { addWards, getAllWards, getSingleWards };
