const { authenticateToken } = require('../Middleware/authMiddleware')
const {roleCheck} = require('../Middleware/roleMiddleware')

const {roomsController, getAvailableRooms, getSingleRoom} = require("../Controllers/RoomsController")
const roomsRouter = app => {
app.post('/add-rooms',authenticateToken, roleCheck(["admin"])), roomsController;


app.get('/get-all-rooms',authenticateToken, roleCheck(['admin']), getAvailableRooms)
app.get('/get-single-room/:room_id', authenticateToken, roleCheck(['admin']), getSingleRoom)

}

module.exports={
    roomsRouter
}