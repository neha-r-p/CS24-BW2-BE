const router = require('express').Router();
const roomsDB = require('./roomsDB');

router.get('/', (req, res) => {
    roomsDB.getRooms()
        .then(rooms => res.status(200).json(rooms))
        .catch(err => res.status(500).json({errorMassage: "Server could not retrieve rooms"}))
})

router.post('/', createRoom, formatExits, (req, res) => {
    const room = req.body;
    const {exits, title, room_id, description, coordinates, cooldown} = room;
    //create exits for room
    roomsDB.createRoomsExits(req.exits)
        .then(exit => res.status(201).json('Room was created'))
        .catch(err => console.log('Server could not add an exit'))
})

//create a room
function createRoom(req, res, next) {
    const room = req.body;
    const {title, room_id, description, coordinates, cooldown} = room;
    roomsDB.createRoom({title, room_id, description, coordinates, cooldown})
        .then(room => next())
        .catch(err => res.status(500).json({error: "Server could not add a room"}))
}

//format exits
function formatExits(req, res, next){
    const room = req.body
    const {exits, room_id} = room
    const exitsDir = exits.map(item => ({"direction": item, "room_id": room_id}))
    req.exits = exitsDir

    next()
}


module.exports = router;