const db = require('../db/dbConfig')

module.exports = {
  createRoom,
  getRooms,
  getRoomById,
  getRoomByCoordinates,
  updateRoom,
//   createRoomsExits
}

function createRoom(room) {
  return db('rooms').insert(room, '*')
}

function getRooms() {
  return db('rooms')
}

function getRoomById(room_id){
    return db('rooms')
    .where({room_id})
    .first()
}

function getRoomByCoordinates(coordinates){
    return db('rooms')
    .where({coordinates})
    .first()
}


function updateRoom(changes, room_id) {
  return db('rooms')
    .where({room_id})
    .update(changes)
}
