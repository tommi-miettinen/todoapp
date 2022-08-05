const { tables } = require("../constants");

exports.up = function (knex) {
  return knex.schema.table(tables.TODO_LIST_TABLE, (table) => {
    table.boolean("completed");
  });
};

exports.down = function (knex) {
  return knex.schema.table(tables.TODO_LIST_TABLE, (table) => {
    table.dropColumn("completed");
  });
};
