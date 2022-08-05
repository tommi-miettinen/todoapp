import { injectable } from "inversify";
import Todo from "../models/Todo";
import { ITodo } from "../types";

export const ITodoRepositoryType = "ITodoRepository";

export interface ITodoRepository {
  create(userId: number, todo: ITodo): Promise<ITodo>;
  deleteById(userId: number, id: number): Promise<number>;
  updateById(userId: number, id: number, todo: Todo): Promise<ITodo>;
}

@injectable()
export class TodoRepository implements ITodoRepository {
  public async create(userId: number, todo: ITodo): Promise<ITodo> {
    return Todo.query().insert({ ...todo, userId });
  }

  public async deleteById(userId: number, id: number) {
    return Todo.query().delete().where({ userId, id });
  }

  public async updateById(
    userId: number,
    id: number,
    todo: ITodo
  ): Promise<Todo> {
    return Todo.query().where({ userId, id }).patchAndFetchById(id, todo);
  }
}
