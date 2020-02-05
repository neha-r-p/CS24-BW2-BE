exports.up = function(knex) {
  return knex.schema.createTable('rooms', rooms => {
    rooms.increments()

    rooms.string('title', 255).notNullable()
    rooms.integer('room_id').unique()
    rooms.string('description')
    rooms.string('coordinates').notNullable()
    rooms.integer('cooldown').notNullable()
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('rooms')
}
