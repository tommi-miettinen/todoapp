import { injectable } from "inversify";
import User from "../models/User";

export const IUserRepositoryType = "IUserRepository";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findOne(user: User): Promise<User>;
}

@injectable()
export class UserRepository implements IUserRepository {
  public async create(user: User): Promise<User> {
    return User.query().insert({ ...user });
  }

  public async findOne(user: User): Promise<User> {
    return User.query().findOne({ username: user.username });
  }
}
