/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  
    return knex.schema.table('users', function(table) {
        table.string('firstName');
        table.string('lastName');
        table.string('phoneNumber');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.table('users', function(table) {
        table.dropColumn('firstName');
        table.dropColumn('lastName');
        table.dropColumn('phoneNumber');
    })
};
