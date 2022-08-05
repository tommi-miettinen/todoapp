import bcrypt from "bcrypt";
import { injectable } from "inversify";

const SALT_ROUNDS = 10;

export const IPasswordHasherType = "IPasswordHasher";

export interface IPasswordHasher {
  hash(password): Promise<string>;
  compare(password: string, hashedPassword: string): Promise<boolean>;
}

@injectable()
export class PasswordHasher implements IPasswordHasher {
  public async hash(password: string): Promise<string> {
    return bcrypt.hash(password, SALT_ROUNDS);
  }

  public async compare(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
