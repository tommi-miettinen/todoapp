import { inject, injectable } from "inversify";
import {
  ExpressErrorMiddlewareInterface,
  Middleware,
} from "routing-controllers";
import {
  ILogger,
  ILoggerFactory,
  ILoggerFactoryType,
} from "../utils/LoggerFactory";
import { Request, Response, NextFunction } from "express";

@Middleware({ type: "after" })
@injectable()
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
  private logger: ILogger;

  constructor(@inject(ILoggerFactoryType) loggerFactory: ILoggerFactory) {
    this.logger = loggerFactory.createLogger(this);
  }

  public error(
    error: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    if (error) {
      const httpCode = error.httpCode ? error.httpCode : 500;
      const message = error.message ? error.message : "INTERNAL_SERVER_ERROR";
      const name = error.name === "Error" ? "InternalServerError" : error.name;

      this.logger.error(`${httpCode} ${name} ${message}`);
      response.status(httpCode).send({ httpCode, message, name });
    }
    next();
  }
}
