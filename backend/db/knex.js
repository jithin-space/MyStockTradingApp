const Knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const config = knexConfig[environment];

if (!config) {
    throw new Error(`Knex configuration for environment "${environment}" not found.`);
}
const knex = Knex(config);

module.exports = knex;
