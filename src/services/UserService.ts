import { inject, injectable } from "inversify";
import User from "../models/User";
import { IUserRepository, IUserRepositoryType } from "../repositories";
import {
  IPasswordHasher,
  IPasswordHasherType,
} from "../classes/PasswordHasher";

export const IUserServiceType = "IUserService";

export interface IUserService {
  createUser(user: User): Promise<User>;
}

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(IUserRepositoryType) private userRepository: IUserRepository,
    @inject(IPasswordHasherType) private passwordService: IPasswordHasher
  ) {}

  public async createUser(user: User): Promise<User> {
    if (!user.password) {
      throw new Error("Password required");
    }
    user.password = await this.passwordService.hash(user.password);
    return this.userRepository.create(user);
  }
}
