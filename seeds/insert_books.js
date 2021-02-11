const knex = require('../db/knex');
const books = require('../data/book_with_authorId');
const author = require('../data/author');

knex('book').insert(books).then(() => {
    console.log("Books Data inserted");
}).catch(err => {
    console.log(err);
    throw err;
}).finally(() => {
    knex.destroy();
})

knex('author').insert(author).then(() => {
    console.log("Author Data inserted");
}).catch(err => {
    console.log(err);
    throw err;
}).finally(() => {
    knex.destroy();
})