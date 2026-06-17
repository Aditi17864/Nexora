import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { authService } from "../services/authService";

export const authController = {
  async register(req: AuthRequest, res: Response) {
    try {
      const { name, email, password, role = "student" } = req.body;
      const result = await authService.register(name, email, password, role);
      return sendSuccess(res, "User registered successfully", result, 201);
    } catch (error: any) {
      return sendError(res, "Registration failed", error.message, 400);
    }
  },

  async login(req: AuthRequest, res: Response) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return sendError(res, "Email and password are required", undefined, 400);
      }
      const result = await authService.login(email, password);
      return sendSuccess(res, "Login successful", result);
    } catch (error: any) {
      return sendError(res, "Login failed", error.message, 401);
    }
  },

  async logout(req: AuthRequest, res: Response) {
    return sendSuccess(res, "Logout successful");
  },
};
