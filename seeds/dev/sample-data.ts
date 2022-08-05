import * as Knex from "knex";

export function seed(knex: Knex) {
  // Deletes ALL existing entries
  return knex("todos")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("todos").insert([
        { title: "Do something", due: new Date() },
        {
          title: "Build an enterprise-ready Express boilerplate project",
          description: "Say hello to my little project",
          due: new Date()
        }
      ]);
    });
}
