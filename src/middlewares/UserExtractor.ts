import { Request, Response, NextFunction } from "express";
import { inject, injectable } from "inversify";
import { ExpressMiddlewareInterface, Middleware } from "routing-controllers";
import {
  ITokenAuthenticator,
  ITokenAuthenticatorType,
} from "../classes/TokenAuthenticator";

interface IRequest extends Request {
  user: number;
}

@Middleware({ type: "before" })
@injectable()
export class UserExtractor implements ExpressMiddlewareInterface {
  constructor(
    @inject(ITokenAuthenticatorType) private authenticator: ITokenAuthenticator
  ) {}

  public use(request: IRequest, response: Response, next: NextFunction) {
    try {
      const token = request.headers.authorization.split(" ").pop();
      request.user = this.authenticator.decodeToken(token).sub;
      next();
    } catch (err) {
      next();
    }
  }
}
