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
},
{
    country: 'Afghanistan',
    state: 'Badakhshan',
    city: 'Fayzabad'
},
{
    country: 'Albania',
    state: 'Berat',
    city: 'Banaj'
},
{
    country: 'Algeria',
    state: 'Adrar',
    city: 'Aoulef'
},
{
    country: 'Bahamas',
    state: 'North Andros',
    city: 'San Andros'
},
{
    country: 'Bahrain',
    state: 'Muharraq Governorate',
    city: 'AI Hadd'
},
{
    country: 'Bangladesh',
    state: 'Barisal',
    city: 'Barguna'
},
{
    country: 'Cambodia',
    state: 'Banteay Mean Chey',
    city: 'Sisophon'
},
{
    country: 'Cameroon',
    state: 'Adamaoua',
    city: 'Bankim'
},
{
    country: 'Canada',
    state: 'Alberta',
    city: 'Airdrie'
},
{
    country: 'Denmark',
    state: 'Central Denmark Region',
    city: 'Auning'
},
{
    country: 'Djibouti',
    state: 'Arta Region',
    city: 'Arta'
},
{
    country: 'Dominican Republic',
    state: 'Azua',
    city: 'Peralta'
},
{
    country: 'East Timor',
    state: 'Aileu',
    city: 'Lequidoe'
},
{
    country: 'Ecuador',
    state: 'Azuay',
    city: 'Nulti'
},
{
    country: 'Egypt',
    state: 'Asyut Governorate',
    city: 'Asyut'
}]

knex('location').insert(locationData).then(() => {
    console.log("Location Data inserted");
}).catch(err => {
    console.log(err);
    throw err;
}).finally(() => {
    knex.destroy();
})