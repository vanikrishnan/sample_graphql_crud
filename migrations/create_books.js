const knex = require('../db/knex');

knex.schema.createTable('books', (table) => {
    table.increments('id')
    table.string('title')
    table.string('description')
    table.string('subtitle')
    table.string('author')
    table.string('website')
    table.float('rating')
}).then(() => console.log("books table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });