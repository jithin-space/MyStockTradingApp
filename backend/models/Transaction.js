const { Model } = require('objection');

class Transaction extends Model {
  static get tableName() {
    return 'transactions';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['user_id', 'stock_id', 'quantity', 'price', 'type'],
      properties: {
        id: { type: 'integer' },
        user_id: { type: 'integer' },
        stock_id: { type: 'integer' },
        quantity: { type: 'integer' },
        price: { type: 'number' },
        type: { type: 'string', enum: ['buy', 'sell'] },
        created_at: { type: 'string', format: 'date-time' },
        updated_at: { type: 'string', format: 'date-time' }
      }
    };
  }
}

module.exports = Transaction;
