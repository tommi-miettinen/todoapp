import { Model } from "objection";

export default class User extends Model {
  static tableName = "users";
  id: number;
  username: string;
  password: string;
  name?: string;

  static jsonSchema = {
    type: "object",
    required: ["username", "password"],

    properties: {
      id: { type: "integer" },
      username: { type: "string", minLength: 1, maxLength: 255 },
      name: { type: "string", minLength: 1, maxLength: 255 },
      password: { type: "string", minLength: 1, MaxLength: 255 },
    },
  };
}
