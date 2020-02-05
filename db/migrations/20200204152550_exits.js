exports.up = function(knex) {
  return knex.schema.createTable('exits', exits => {
    exits.increments()

    exits.string('direction', 10)
    exits.integer('exit_to').defaultTo(null)
    exits
      .integer('room_id')
      .unsigned()
      .references('id')
      .inTable('rooms')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
  })
}

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('exits')
}
