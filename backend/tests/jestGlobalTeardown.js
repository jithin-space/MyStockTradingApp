const knex = require("../db/knex"); // Adjust the path as necessary
module.exports = async () => {
//   Close the server
  await global.__SERVER__.close(() => {
    console.log("Test server closed");
  });

  // Ensure the Knex instance is destroyed
  await knex.destroy();

  console.log('cleared');
};
