
exports.up = function(knex) {
  return knex.schema.createTable("users", tbl => {
    tbl.increments();
    tbl.string("username").notNullable();
    tbl.string("hash").notNullable();
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("users");
};
