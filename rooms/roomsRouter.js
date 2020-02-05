const router = require('express').Router()
const roomsDB = require('./roomsDB')

router.get('/', (req, res) => {
  roomsDB
    .getRooms()
    .then(rooms => {
      res.status(200).json(rooms)
    })
    .catch(err =>
      res.status(500).json({ errorMassage: 'Server could not retrieve rooms' })
    )
})

//get room by ID
router.get('/:id', (req, res) => {
  console.log(req.params)
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

//create room
router.post('/', formatExits, (req, res) => {
  const room = req.body
  req.body.exits = req.exits
  const { title, room_id, description, coordinates, cooldown, exits } = room
  roomsDB
    .createRoom({ title, room_id, description, coordinates, cooldown, exits })
    .then(room => {
        console.log("room", room)
        res.status(201).json('Room was created')
    })
    .catch(err =>
      res.status(500).json({ error: 'Server could not add a room' })
    )
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
