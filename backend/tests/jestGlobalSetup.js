const knex = require('../db/knex'); // Adjust the path as necessary
const app = require('../app'); // Ensure this is your Express app
const http = require('http');

let server;

module.exports = async () => {
  await knex.migrate.rollback();
  await knex.migrate.latest();
  await knex.seed.run();

  server = http.createServer(app);
  global.__SERVER__ = server.listen(4000, () => {
    console.log('Test server running on port 4000');
  });
  // Store the server address

};
