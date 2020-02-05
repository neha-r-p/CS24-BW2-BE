const router = require('express').Router()
const roomsDB = require('./roomsDB')

router.get('/', (req, res) => {
  roomsDB
    .getRooms()
    .then(rooms => {
      roomRes = []
      rooms.forEach(room => {
        filtered = roomRes.filter(rm => rm.room_id == room.room_id)
        if (filtered.length > 0) {
          filtered[0].exits.push(room.direction)
        } else {
          roomRes.push({
            title: room.title,
            room_id: room.room_id,
            description: room.description,
            coordinates: room.coordinates,
            cooldown: room.cooldown,
            exits: [room.direction]
          })
        }
      })
      res.status(200).json(roomRes)
    })
    .catch(err =>
      res.status(500).json({ errorMassage: 'Server could not retrieve rooms' })
    )
})

router.post('/', createRoom, formatExits, (req, res) => {
  //create exits for room
  roomsDB
    .createRoomsExits(req.exits)
    .then(exit => res.status(201).json('Room was created'))
    .catch(err => console.log('Server could not add an exit'))
})

//create a room
function createRoom(req, res, next) {
  const room = req.body
  const { title, room_id, description, coordinates, cooldown } = room
  roomsDB
    .createRoom({ title, room_id, description, coordinates, cooldown })
    .then(room => next())
    .catch(err =>
      res.status(500).json({ error: 'Server could not add a room' })
    )
}

//format exits
function formatExits(req, res, next) {
  const room = req.body
  const { exits, room_id } = room
  const exitsDir = exits.map(item => ({ direction: item, room_id: room_id }))
  req.exits = exitsDir

  next()
}

module.exports = router
