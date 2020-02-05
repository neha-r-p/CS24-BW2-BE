const db = require('../db/rooms')

modules.exports = {
  createRoom,
  getRooms,
  updateRoom
}

function createRoom(room) {
  return db('rooms').insert(room, 'room_id')
}

function getRooms() {
  return db('rooms').join("exits", "exits.room_id", "rooms.room_id")
}

function updateRoom(room, exit) {
  return db('exits')
    .where(room)
    .update(exit, '*')
}
