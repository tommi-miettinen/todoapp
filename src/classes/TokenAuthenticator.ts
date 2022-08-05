import dotenv from "dotenv";
import { injectable } from "inversify";
import jwt from "jsonwebtoken";

dotenv.config();

const WEEK = 604800000;
const SECRET = process.env.JWT_SIGNING_SECRET;

const getSecondsNow = () => Math.floor(new Date().getTime() / 1000);

export interface JwtPayload {
  sub: number;
  iat: number;
  exp: number;
}

export const issueToken = (sub: number, validFor: number = WEEK): string => {
  const iat = getSecondsNow();
  const exp = iat + Math.floor(validFor);
  const payload: JwtPayload = {
    sub,
    iat,
    exp,
  };
  return jwt.sign(payload, SECRET);
};

export const ITokenAuthenticatorType = "ITokenAuthenticator";

export interface ITokenAuthenticator {
  issueToken(sub: number): string;
  decodeToken(token: string): JwtPayload;
}

@injectable()
export class TokenAuthenticator implements ITokenAuthenticator {
  public issueToken = (sub: number) => issueToken(sub);
  public decodeToken = (token: string) => jwt.verify(token, SECRET);
}
