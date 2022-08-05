import { Container } from "inversify";
import {
  LoginController,
  TodoController,
  TodoListController,
  UserController,
} from "./controllers";
import { ErrorHandler, UserExtractor } from "./middlewares";
import {
  ITodoListRepository,
  ITodoListRepositoryType,
  ITodoRepository,
  ITodoRepositoryType,
  IUserRepository,
  IUserRepositoryType,
  TodoListRepository,
  TodoRepository,
  UserRepository,
} from "./repositories";
import {
  ILoginService,
  ILoginServiceType,
  ITodoListService,
  ITodoListServiceType,
  ITodoService,
  ITodoServiceType,
  IUserService,
  IUserServiceType,
  LoginService,
  TodoListService,
  TodoService,
  UserService,
} from "./services";

import {
  TokenAuthenticator,
  ITokenAuthenticator,
  ITokenAuthenticatorType,
} from "./classes/TokenAuthenticator";
import {
  IPasswordHasher,
  IPasswordHasherType,
  PasswordHasher,
} from "./classes/PasswordHasher";

import {
  ILoggerFactory,
  ILoggerFactoryType,
  LoggerFactory,
} from "./utils/LoggerFactory";

const container = new Container();
container.bind<IUserRepository>(IUserRepositoryType).to(UserRepository);
container.bind<IUserService>(IUserServiceType).to(UserService);
container.bind<UserController>(UserController).toSelf();
container.bind<ILoginService>(ILoginServiceType).to(LoginService);
container.bind<IPasswordHasher>(IPasswordHasherType).to(PasswordHasher);
container
  .bind<ITokenAuthenticator>(ITokenAuthenticatorType)
  .to(TokenAuthenticator);
container.bind<LoginController>(LoginController).toSelf();
container.bind<ITodoRepository>(ITodoRepositoryType).to(TodoRepository);
container.bind<ITodoService>(ITodoServiceType).to(TodoService);
container.bind<TodoController>(TodoController).toSelf();
container
  .bind<ITodoListRepository>(ITodoListRepositoryType)
  .to(TodoListRepository);
container.bind<ITodoListService>(ITodoListServiceType).to(TodoListService);
container.bind<TodoListController>(TodoListController).toSelf();
container
  .bind<ILoggerFactory>(ILoggerFactoryType)
  .to(LoggerFactory)
  .inSingletonScope();
container.bind<ErrorHandler>(ErrorHandler).toSelf();
container.bind<UserExtractor>(UserExtractor).toSelf();

if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  // container.applyMiddleware(makeLoggerMiddleware());
}

export default container;
