import { inject, injectable } from "inversify";
import {
  Authorized,
  Body,
  Delete,
  JsonController,
  Param,
  Patch,
  Req,
} from "routing-controllers";
import { ITodoService, ITodoServiceType } from "../services";

@JsonController("/todos")
@Authorized()
@injectable()
export class TodoController {
  constructor(@inject(ITodoServiceType) private todoService: ITodoService) {}
  @Delete("/:id")
  public async deleteById(@Param("id") id, @Req() req) {
    return this.todoService.deleteById(req.user, id);
  }

  @Patch("/:id")
  public async updateById(@Param("id") id, @Req() req, @Body() todo) {
    return this.todoService.updateById(req.user, id, todo);
  }
}
