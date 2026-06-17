import { Response, NextFunction } from "express";
import { AuthRequest } from "../types";
import { sendError } from "../utils/response";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRegister = (req: AuthRequest, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return sendError(res, "Missing required fields", "Name, email, and password are required", 400);
  }

  if (!validateEmail(email)) {
    return sendError(res, "Invalid email format", undefined, 400);
  }

  if (!validatePassword(password)) {
    return sendError(res, "Password must be at least 6 characters", undefined, 400);
  }

  next();
};
