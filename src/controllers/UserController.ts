import { inject, injectable } from "inversify";
import { Body, JsonController, Post } from "routing-controllers";
import { IUserService, IUserServiceType } from "../services";
import User from "../models/User";

@JsonController("/users")
@injectable()
export class UserController {
  constructor(@inject(IUserServiceType) private userService: IUserService) {}

  @Post("/")
  public async create(@Body() user: User) {
    return this.userService.createUser(user);
  }
}
