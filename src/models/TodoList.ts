import { Model } from "objection";
import { tables } from "../../constants";
import Todo from "./Todo";

export default class TodoList extends Model {
  static tableName = tables.TODO_LIST_TABLE;

  title: string;
  id: number;
  userId: number;
  completed: boolean;
  todos: Todo[];

  static jsonSchema = {
    type: "object",

    properties: {
      id: { type: "integer" },
      userId: { type: "integer" },
      title: { type: "string", minLength: 1, MaxLength: 255 },
    },
  };

  static relationMappings = {
    todos: {
      relation: Model.HasManyRelation,
      modelClass: Todo,
      join: {
        from: `${tables.TODO_LIST_TABLE}.id`,
        to: "todos.todoListId",
      },
    },
  };
}
