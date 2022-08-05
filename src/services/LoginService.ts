import { inject, injectable } from "inversify";
import User from "../models/User";
import { IUserRepository, IUserRepositoryType } from "../repositories";
import {
  ITokenAuthenticator,
  ITokenAuthenticatorType,
} from "../classes/TokenAuthenticator";
import {
  IPasswordHasher,
  IPasswordHasherType,
} from "../classes/PasswordHasher";

export const ILoginServiceType = "ILoginService";

export interface ILoginService {
  login(user: User): Promise<string>;
}

@injectable()
export class LoginService implements ILoginService {
  constructor(
    @inject(IPasswordHasherType) private password: IPasswordHasher,
    @inject(ITokenAuthenticatorType) private authenticator: ITokenAuthenticator,
    @inject(IUserRepositoryType) private userRepository: IUserRepository
  ) {}

  public async login(user: User): Promise<string> {
    //prettier-ignore
    const foundUser = await this.userRepository.findOne(user);
    if (!foundUser) throw new Error("User not found");

    //prettier-ignore
    const passwordMatch = await this.password.compare(user.password, foundUser.password)

    if (passwordMatch) {
      return this.authenticator.issueToken(foundUser.id);
    } else {
      throw new Error("Invalid credentials");
    }
  }
}
