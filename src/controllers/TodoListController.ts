import { inject, injectable } from "inversify";
import {
  Authorized,
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Req,
} from "routing-controllers";
import {
  ITodoListService,
  ITodoListServiceType,
  ITodoService,
  ITodoServiceType,
} from "../services";
import TodoList from "../models/TodoList";

@JsonController("/todolists")
@Authorized()
@injectable()
export class TodoListController {
  constructor(
    @inject(ITodoListServiceType) private todoListService: ITodoListService,
    @inject(ITodoServiceType) private todoService: ITodoService
  ) {}

  @Get("/")
  public async getAll(@Req() req) {
    return this.todoListService.getAll(req.user);
  }

  @Post("/")
  public async create(@Req() req, @Body() data: TodoList) {
    return this.todoListService.create(req.user, data);
  }

  @Patch("/:id")
  public async update(
    @Param("id") id: number,
    @Req() req,
    @Body() todoList: TodoList
  ) {
    return this.todoListService.updateById(req.user, id, todoList);
  }

  @Delete("/:id")
  public async deleteById(@Param("id") id: number, @Req() req) {
    return this.todoListService.deleteById(req.user, id);
  }

  @Post("/:id/todos")
  public async createTodo(@Param("id") id, @Req() req, @Body() todo) {
    return this.todoService.create(req.user, id, todo);
  }
}
