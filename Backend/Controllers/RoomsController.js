const { rooms, wardModel, rooms } = require("../Models/index");

const roomsController = async (req, res) => {
  try {
    const { ward_id, room_number, bed_count, occupied_beds } = req.body;

    const ward = await wardModel.findByPk(ward_id);
    if (!ward) return res.status(404).json({ error: "Ward not found" });

    const availableRooms = await rooms.create({
      ward_id: ward.ward_id,
      room_number,
      bed_count,
      occupied_beds,
    });

    console.log("newRoom: ", availableRooms);
    res.status(200).json({ message: "available rooms", availableRooms });
  } catch (error) {
    console.error(error);

    res.status(500).json({ error: error });
  }
};

const getAvailableRooms = async (req, res) => {

  try {
    const available = await rooms.findAll();
    console.log("available room:", available);

    res.status(200).json(available);
  } catch (error) {
    console.error("error", error);
    res.status(500).json({ message: "error finding rooms", error });
  }
};

const getSingleRoom = async (req, res) => {

try {
      const { room_id } = req.params;
      const foundRoom = await rooms.findOne({ room_id: `${room_id}` });
      console.log(foundRoom)
  res.status(200).json({message: "found room",foundRoom});

} catch (error) {
  console.error('error', error);
res.status(500).json({message:"error finding room",error})
}

}


module.exports = { roomsController, getAvailableRooms, getSingleRoom };
