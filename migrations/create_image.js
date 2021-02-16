const knex = require('../db/knex');

knex.schema.createTable('images', (table) => {
    table.increments('id')
    table.string('filename')
}).then(() => console.log("image table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });