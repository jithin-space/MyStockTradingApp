/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('stocks', table => {
        table.increments('id').primary();
        table.string('symbol').unique().notNullable();
        table.string('name').notNullable();
        table.decimal('price', 14, 2).notNullable();
        table.timestamps(true, true); // Adds created_at and updated_at timestamps
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('stocks');
};
