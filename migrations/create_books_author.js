const knex = require('../db/knex');

knex.schema.createTable('book', (table) => {
    table.increments('id')
    table.string('title')
    table.string('description')
    table.string('subtitle')
    table.integer('authorId')
    table.string('website')
    table.float('rating')
}).then(() => console.log("books table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });


knex.schema.createTable('author', (table) => {
    table.increments('id')
    table.string('name')
}).then(() => console.log("author table created"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });