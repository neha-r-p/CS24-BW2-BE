exports.up = function(knex) {
  return knex.schema.createTable('rooms', rooms => {
    rooms.increments()

    rooms.string('title', 255).notNullable()
    rooms.integer('room_id').unique()
    rooms.string('description')
    rooms.string('coordinates').notNullable()
    rooms.integer('cooldown').notNullable()
    rooms.string('exits')
    rooms.integer('n').defaultTo(null)
    rooms.integer('s').defaultTo(null)
    rooms.integer('e').defaultTo(null)
    rooms.integer('w').defaultTo(null)
  })
}

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('rooms')
}
