/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  
    await knex.schema.alterTable('users', function(table) {
        table.dropUnique('username');
    }).catch(() => {
        /* Ignore errors if not present */
    });
    
    return knex.schema.alterTable('users', function(table) {
        table.unique('username');
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
    return knex.schema.alterTable('users', function(table) {
        table.dropUnique('username');
    })
};
