const knex = require('../db/knex');

knex.schema.createTable('location', (table) => {
    table.increments('id')
    table.string('country')
    table.string('state')
    table.string('city')
}).then(() => console.log("location table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });