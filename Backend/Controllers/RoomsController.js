const { rooms, wardModel } = require("../Models/index");

const roomsController = async (req, res) => {
  try {
    const { name, capacity, ward_id, room_number, bed_count, occupied_beds } = req.body;

    const ward = await wardModel.findOne({where: { name: name}});
    if (!ward) return res.status(404).json({ error: "Ward not found" });


 const existingRooms = await rooms.findAll({
      where: { ward_id: ward.ward_id },
    });

    const totalBedsInWard = existingRooms.reduce(
      (sum, room) => sum + room.bed_count,
      0
    );

      if (ward.capacity && totalBedsInWard + bed_count > ward.capacity) {
      return res.status(400).json({
        error: `Cannot add room. Ward '${ward.name}' capacity is ${ward.capacity}, current beds = ${totalBedsInWard}, new room adds ${bed_count}.`,
      });
    }



    const createRooms = await rooms.create({
      ward_id: ward.ward_id,
      room_number,
      bed_count,
      occupied_beds,
    });

    console.log("newRoom: ", createRooms);
    res.status(200).json({ message: "available rooms", createRooms });
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
