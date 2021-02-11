const knex = require('../db/knex');
const locationData = [{
country: 'India',
state: 'TamilNadu',
city: 'Chennai'
},
{
country: 'India',
state: 'TamilNadu',
city: 'Madurai'
},
{
country: 'India',
state: 'Karnataka',
city: 'Bangalore'
}]

knex('location').insert(locationData).then(() => {
    console.log("Location Data inserted");
}).catch(err => {
    console.log(err);
    throw err;
}).finally(() => {
    knex.destroy();
})