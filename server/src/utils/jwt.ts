import jwt, { Secret, SignOptions } from "jsonwebtoken";
import { config } from "../config/environment";

export const generateToken = (userId: string, role: string): string => {
  return jwt.sign(
    { id: userId, role },
    config.jwtSecret as Secret,
    { expiresIn: config.jwtExpire as SignOptions["expiresIn"] }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    config.jwtRefreshSecret as Secret,
    { expiresIn: config.jwtRefreshExpire as SignOptions["expiresIn"] }
  );
};

export const verifyToken = (token: string) => {
  return jwt.verify(token, config.jwtSecret as Secret);
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, config.jwtRefreshSecret as Secret);
};