import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { User } from "../models/User";

export const userController = {
  async getProfile(req: AuthRequest, res: Response) {
    try {
      const user = await User.findById(req.user?.id);
      if (!user) {
        return sendError(res, "User not found", undefined, 404);
      }
      return sendSuccess(res, "User profile fetched", user);
    } catch (error: any) {
      return sendError(res, "Failed to fetch profile", error.message, 500);
    }
  },

  async getAllUsers(req: AuthRequest, res: Response) {
    try {
      const users = await User.find().select("-password");
      return sendSuccess(res, "Users fetched", users);
    } catch (error: any) {
      return sendError(res, "Failed to fetch users", error.message, 500);
    }
  },

  async updateUser(req: AuthRequest, res: Response) {
    try {
      const { name, profileImage } = req.body;
      const user = await User.findByIdAndUpdate(
        req.user?.id,
        { name, profileImage },
        { new: true }
      );
      return sendSuccess(res, "User updated successfully", user);
    } catch (error: any) {
      return sendError(res, "Failed to update user", error.message, 500);
    }
  },

  async deleteUser(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      await User.findByIdAndDelete(id);
      return sendSuccess(res, "User deleted successfully");
    } catch (error: any) {
      return sendError(res, "Failed to delete user", error.message, 500);
    }
  },
};
