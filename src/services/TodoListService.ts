import { inject, injectable } from "inversify";
import { ITodoListRepository, ITodoListRepositoryType } from "../repositories";
import { ITodoList } from "../types";

export const ITodoListServiceType = "ITodoListService";

export interface ITodoListService {
  getAll(userId: number): Promise<ITodoList[]>;
  create(userId: number, data: ITodoList): Promise<ITodoList>;
  deleteById(userId: number, id: number): Promise<number>;
  //prettier-ignore
  updateById(userId:number,id: number, todoList: ITodoList): Promise<ITodoList>;
}

@injectable()
export class TodoListService implements ITodoListService {
  constructor(
    @inject(ITodoListRepositoryType)
    private todoListRepository: ITodoListRepository
  ) {}

  public async create(userId: number, data: ITodoList): Promise<ITodoList> {
    return this.todoListRepository.create(userId, data);
  }

  //prettier-ignore
  public async updateById(userId:number,id: number, todoList: ITodoList): Promise<ITodoList> {
    return this.todoListRepository.updateById(userId,todoList.id,todoList);
  }

  public async getAll(userId: number): Promise<ITodoList[]> {
    return this.todoListRepository.getAll(userId);
  }

  public async deleteById(userId: number, id: number) {
    return this.todoListRepository.deleteById(userId, id);
  }
}
