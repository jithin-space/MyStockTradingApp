/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('stocks').del();

  // Inserts seed entries
  await knex('stocks').insert([
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 145.09
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 2729.89
    },
    {
      symbol: 'AMZN',
      name: 'Amazon.com Inc.',
      price: 3342.88
    },
    {
      symbol: 'TSLA',
      name: 'Tesla Inc.',
      price: 688.99
    }
  ]);
};
