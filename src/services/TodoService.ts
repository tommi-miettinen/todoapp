import { inject, injectable } from "inversify";
import Todo from "../models/Todo";
import { ITodoRepository, ITodoRepositoryType } from "../repositories";
import { ITodo } from "../types";

export const ITodoServiceType = "ITodoService";

export interface ITodoService {
  create(userId: number, todoListId: number, todo: ITodo): Promise<ITodo>;
  deleteById(userId: number, id: number);
  updateById(userId: number, id: number, todo: ITodo): Promise<ITodo>;
}

@injectable()
export class TodoService implements ITodoService {
  constructor(
    @inject(ITodoRepositoryType) private todoRepository: ITodoRepository
  ) {}

  public async create(userId: number, todoListId: number, todo: ITodo) {
    return this.todoRepository.create(userId, { todoListId, ...todo });
  }

  public async deleteById(userId: number, id: number) {
    return this.todoRepository.deleteById(userId, id);
  }

  public async updateById(
    userId: number,
    id: number,
    todo: Todo
  ): Promise<ITodo> {
    return this.todoRepository.updateById(userId, id, todo);
  }
}
