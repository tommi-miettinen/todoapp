import Knex from "knex";
import { Model } from "objection";

const initKnexDb = async (config) => {
  const knex = Knex(config);
  await knex.migrate.latest();
  Model.knex(knex);
};

export default initKnexDb;
