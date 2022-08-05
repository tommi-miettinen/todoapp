import chalk from "chalk";
import { injectable } from "inversify";
import { Format, FormatWrap } from "logform";
import * as winston from "winston";

export type ILogger = winston.Logger;

const nameOf = (param: any): string => {
  switch (typeof param) {
    case "function":
      return param.name;
    case "object":
      return param.constructor.name;
    case "string":
      return param;
    default:
      return param.toString();
  }
};

const getName = (type: any): ((opts?: object) => Format) =>
  winston.format((info, opts) => {
    info.name = nameOf(type);
    return info;
  });

const uppercaseLevels: FormatWrap = winston.format((info, opts) => {
  info.level = (info.level || "").toUpperCase();
  return info;
});

const colorizingFormatter = (type: any): Format =>
  winston.format.combine(
    uppercaseLevels(),
    winston.format.colorize(),
    winston.format.timestamp(),
    getName(type)(),
    winston.format.printf(
      (info) =>
        `${chalk.cyan(info.timestamp)} ${chalk.magenta(`[${info.name}]`)} ${
          info.level
        }: ${info.message}`
    ) //tslint:disable-line
  );

export const createLogger = (type: any): ILogger =>
  winston.createLogger({
    level: "info",
    format: colorizingFormatter(type),
    transports: [new winston.transports.Console()],
  });

export const ILoggerFactoryType = "ILoggerFactory";

export interface ILoggerFactory {
  createLogger(type: any): ILogger;
}

@injectable()
export class LoggerFactory implements ILoggerFactory {
  public createLogger(type: any): ILogger {
    return createLogger(type);
  }
}
