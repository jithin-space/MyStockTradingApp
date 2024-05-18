const knex = require('../db/knex'); // Adjust the path to your knex instance

let trx;


beforeEach(async () => {
  trx = await knex.transaction(); // Start a new transaction
});

afterEach(async () => {
  await trx.rollback(); // Rollback the transaction after each test
});


afterAll(async () => {  
    await knex.destroy();
});
