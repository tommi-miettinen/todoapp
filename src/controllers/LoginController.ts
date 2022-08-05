import { inject, injectable } from "inversify";
import { Body, JsonController, Post } from "routing-controllers";
import { ILoginService, ILoginServiceType } from "../services";
import User from "../models/User";

@JsonController("/login")
@injectable()
export class LoginController {
  constructor(@inject(ILoginServiceType) private loginService: ILoginService) {}

  @Post("/")
  public async login(@Body() user: User) {
    return this.loginService.login(user);
  }
}
