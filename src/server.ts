import dotenv from "dotenv";
import morgan from "morgan";
import "reflect-metadata";
import { Action, createExpressServer, useContainer } from "routing-controllers";
import {
  LoginController,
  TodoController,
  TodoListController,
  UserController,
} from "./controllers";
import iocContainer from "./inversify.config";
import { ErrorHandler, UserExtractor } from "./middlewares";
import express from "express";
import * as path from "path";
import initKnexDb from "./database/Database";
import knexfile from "../knexfile";

dotenv.config();

initKnexDb(knexfile[process.env.ENV || "development"]);

useContainer(iocContainer);

const app = createExpressServer({
  cors: true,
  controllers: [
    TodoController,
    UserController,
    LoginController,
    TodoListController,
  ],
  middlewares: [UserExtractor, ErrorHandler],
  defaultErrorHandler: false,
  authorizationChecker: async (action: Action) => Boolean(action.request.user),
});

app.use(morgan("dev"));
app.use(express.static(path.resolve(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "build", "index.html"));
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // tslint:disable-next-line
  console.log(`Server started at ${new Date()} on port ${PORT}!`);
});

export default app;
