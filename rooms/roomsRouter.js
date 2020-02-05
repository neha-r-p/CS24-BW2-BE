const router = require('express').Router();
const roomsDB = require('./roomsDB')

router.get('/', (req, res) => {
    roomsDB.getRooms()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(500).json({"errorMassage": err}))
})

router.post('/', (req, res) => {
    const room = req.body;
    const {exits, title, room_id, description, coordinates, cooldown} = room
    roomsDB.createRoom
})