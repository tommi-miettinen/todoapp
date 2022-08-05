import { Model } from "objection";

export default class Todo extends Model {
  static tableName = "todos";
  public id: number;
  public title: string;
  public description?: string;
  public todoListId: number;
  public userId: number;
  public completed: boolean;

  static jsonSchema = {
    type: "object",
    required: ["title", "userId", "todoListId"],

    properties: {
      id: { type: "integer" },
      title: { type: "string", minLength: 1, maxLength: 255 },
      description: { type: "string", minLength: 1, maxLength: 255 },
      userId: { type: "integer" },
      todoListId: { type: "integer" },
    },
  };
}
