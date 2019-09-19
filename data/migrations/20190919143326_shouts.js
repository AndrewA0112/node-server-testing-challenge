exports.up = function (knex, Promise) {
    return knex.schema.createTable('shouts', tbl => {
        tbl.increments();
        tbl.string('message', 255).notNullable();
    });
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTableIfExists('shouts');
};
