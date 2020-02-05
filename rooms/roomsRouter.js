const router = require('express').Router()
const roomsDB = require('./roomsDB')

router.get('/', (req, res) => {
  roomsDB
    .getRooms()
    .then(rooms => {
      res.status(200).json(rooms)
    })
    .catch(err =>
      res.status(500).json({ errorMassage: 'Server could not retrieve rooms.' })
    )
})

//get room by ID
router.get('/:id', (req, res) => {
  const { id } = req.params

  roomsDB
    .getRoomById(id)
    .then(room => {
      res.status(200).json(room)
    })
    .catch(err =>
      res.status(500).json({ error: 'Room could not be retrieved.' })
    )
})

//get room by coordinates
router.post('/coord', (req, res) => {
  const { coordinates } = req.body
  roomsDB
    .getRoomByCoordinates(coordinates)
    .then(room => res.status(200).json(room))
    .catch(err => res.status(500).json({ error: "Room could not be retrieved."}))
})

//create room
router.post('/', formatExits, (req, res) => {
  let room = req.body
  //   console.log(req.body.n)
  room.n = null
  room.s = null
  room.e = null
  room.w = null

  let {
    title,
    room_id,
    description,
    coordinates,
    cooldown,
    exits,
    n,
    s,
    e,
    w
  } = room
  exits.forEach(exit => (room[exit] = -1))

  exits = req.exits
  roomsDB
    .createRoom({
      title,
      room_id,
      description,
      coordinates,
      cooldown,
      exits,
      n: room.n,
      s: room.s,
      e: room.e,
      w: room.w
    })
    .then(room => {
      res.status(201).json('Room was created')
    })
    .catch(err =>
      res.status(500).json({ error: 'Server could not add a room' })
    )
})

//update exit to's
router.put('/:id', (req, res) => {
  const { id } = req.params
  const changes = req.body

  roomsDB
    .getRoomById(id)
    .then(room => {
      if (room) {
        roomsDB.updateRoom(changes, id).then(updatedRoom => {
          res.status(200).json(updatedRoom)
        })
      } else {
        res.status(404).json({ error: 'Room not found.' })
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Failed to update room.' })
    })
})

//format exits
function formatExits(req, res, next) {
  const room = req.body
  const { exits } = room
  const exitsDir = JSON.stringify(exits)
  req.exits = exitsDir

  next()
}

module.exports = router
