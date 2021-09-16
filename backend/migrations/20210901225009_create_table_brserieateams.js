exports.up = function (knex) {
    return knex.schema.createTable('brserieateams', table => {
        table.increments('id').primary()
        table.integer('position').notNull()
        table.string('name').notNull()
        table.integer('pts').notNull()
        table.integer('pj').notNull()
        table.integer('vit').notNull()
        table.integer('e').notNull()
        table.integer('der').notNull()
        table.integer('gp').notNull()
        table.integer('gc').notNull()
        table.integer('sg').notNull()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('brserieateams')
};