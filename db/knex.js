const environment = "development";
const config = require('../knexfile');
const envConfig = config[environment];
const knex = require('knex');
const connection = knex(envConfig);

module.exports=connection;