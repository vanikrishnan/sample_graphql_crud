const knex = require('../db/knex');
const books = require('../data/books');

knex('books').insert(books).then(()=> {
console.log("Data inserted");
}).catch(err=>{
console.log(err);
throw err;
}).finally(()=>{
    knex.destroy();
})