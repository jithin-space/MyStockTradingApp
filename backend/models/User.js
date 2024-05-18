const { Model } = require('objection');
const Knex = require('knex');
const knexConfig = require('../knexfile');

const environment = process.env.NODE_ENV || 'development';
const knex = Knex(knexConfig[environment]);

Model.knex(knex);

class User extends Model {
    static get tableName() {
        return 'users';
    }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['username', 'password', 'email'],

            properties: {
                id: { type: 'integer' },
                username: { type: 'string', minLength: 1, maxLength: 255 },
                password: { type: 'string', minLength: 1, maxLength: 255 },
                email: { type: 'string', format: 'email' },
                firstName: { type: 'string', minLength: 1, maxLength: 255 },
                lastName: { type: 'string', minLength: 1, maxLength: 255 },
                phoneNumber: { type: 'string', minLength: 1, maxLength: 20 },
                created_at: { type: 'string', format: 'date-time' },
                updated_at: { type: 'string', format: 'date-time' }
            }
        }
    }
}

module.exports = User;