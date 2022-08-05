import { injectable } from "inversify";
import Todo from "../models/Todo";
import TodoList from "../models/TodoList";
import { ITodoList } from "../types";

export const ITodoListRepositoryType = "ITodoListRepository";

export interface ITodoListRepository {
  getAll(userId: number): Promise<ITodoList[]>;
  create(userId: number, data: ITodoList): Promise<ITodoList>;
  deleteById(userId: number, id: number): Promise<number>;
  //prettier-ignore
  updateById(userId:number,id: number, todoList: ITodoList): Promise<ITodoList>;
}

@injectable()
export class TodoListRepository implements ITodoListRepository {
  public async getAll(userId: number): Promise<ITodoList[]> {
    return TodoList.query().where({ userId }).withGraphFetched("todos");
  }

  public async create(userId: number, data: ITodoList): Promise<ITodoList> {
    return TodoList.transaction(async (trx) => {
      const todoList = await TodoList.query(trx).insert({
        userId,
        completed: data.completed || false,
        title: data.title,
      });
      const editedTodos = data.todos
        ? data.todos.map(({ id, ...todo }) => ({
            ...todo,
            todoListId: todoList.id,
          }))
        : [];
      const todos = await Todo.query(trx).insertGraph(editedTodos);
      todoList.todos = todos;
      return todoList;
    });
  }

  //prettier-ignore
  public async updateById(userId:number, id: number, todoList: TodoList): Promise<ITodoList> {
    return TodoList.query()
      .where({ userId, id })
      .patchAndFetchById(id, { ...todoList,userId });
  }

  public async deleteById(userId: number, id: number): Promise<number> {
    return TodoList.query().delete().where({ userId, id });
  }
}
