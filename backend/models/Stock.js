const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);

Model.knex(knex);

class Stock extends Model {
  static get tableName() {
    return 'stocks';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['symbol', 'name', 'price'],

      properties: {
        id: { type: 'integer' },
        symbol: { type: 'string', minLength: 1, maxLength: 10 },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        price: { type: 'number' },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Stock;
