/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const bcrypt = require('bcryptjs');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {
      username: 'johndoe',
      password: await bcrypt.hash('password123', 10), // hashed password for 'password123'
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '1234567890'
    },
    {
      username: 'janedoe',
      password: await bcrypt.hash('mypassword', 10), // hashed password for 'mypassword'
      email: 'janedoe@example.com',
      firstName: 'Jane',
      lastName: 'Doe',
      phoneNumber: '0987654321'
    }

  ]);
};

/*
const bcrypt = require('bcryptjs');

const passwords = ['password123', 'mypassword'];

passwords.forEach(async (password) => {
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(`Original: ${password}, Hashed: ${hashedPassword}`);
});
*/
