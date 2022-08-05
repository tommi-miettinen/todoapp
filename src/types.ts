export interface ITodo {
  id: number;
  title: string;
  description?: string;
  todoListId: number;
  userId: number;
  completed: boolean;
}

export interface ITodoList {
  title: string;
  id: number;
  userId: number;
  completed: boolean;
  todos: ITodo[];
}
