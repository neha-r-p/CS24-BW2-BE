const db = require('../db/dbConfig')

module.exports = {
  createRoom,
  getRooms,
  updateRoom,
  createRoomsExits
}

function createRoom(room) {
  return db('rooms').insert(room, 'room_id')
}

function getRooms() {
  return db('rooms')
      .leftJoin("exits", "exits.room_id", "rooms.room_id")
}

function createRoomsExits(exit) {
  return db('exits')
      .insert(exit, "*")
}

function updateRoom(room, exit) {
  return db('exits')
    .where(room)
    .update(exit, '*')
}
