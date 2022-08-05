const { tables } = require("../constants");

exports.up = function (knex) {
  return knex.schema.table(tables.TODO_LIST_TABLE, (table) => {
    table.string("title");
  });
};

exports.down = function (knex) {
  return knex.schema.table(tables.TODO_LIST_TABLE, (table) => {
    table.dropColumn("title");
  });
};
