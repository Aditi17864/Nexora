import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { Task } from "../models/Task";

export const taskController = {
  async createTask(req: AuthRequest, res: Response) {
    try {
      const { title, description, assignedTo, deadline, priority } = req.body;
      const task = new Task({
        title,
        description,
        assignedTo,
        assignedBy: req.user?.id,
        deadline,
        priority,
      });
      await task.save();
      return sendSuccess(res, "Task created successfully", task, 201);
    } catch (error: any) {
      return sendError(res, "Failed to create task", error.message, 400);
    }
  },

  async getTasks(req: AuthRequest, res: Response) {
    try {
      const tasks = await Task.find().sort({ deadline: 1 });
      return sendSuccess(res, "Tasks fetched", tasks);
    } catch (error: any) {
      return sendError(res, "Failed to fetch tasks", error.message, 500);
    }
  },

  async getTaskById(req: AuthRequest, res: Response) {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) {
        return sendError(res, "Task not found", undefined, 404);
      }
      return sendSuccess(res, "Task fetched", task);
    } catch (error: any) {
      return sendError(res, "Failed to fetch task", error.message, 500);
    }
  },

  async updateTask(req: AuthRequest, res: Response) {
    try {
      const task = await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      return sendSuccess(res, "Task updated successfully", task);
    } catch (error: any) {
      return sendError(res, "Failed to update task", error.message, 500);
    }
  },

  async deleteTask(req: AuthRequest, res: Response) {
    try {
      await Task.findByIdAndDelete(req.params.id);
      return sendSuccess(res, "Task deleted successfully");
    } catch (error: any) {
      return sendError(res, "Failed to delete task", error.message, 500);
    }
  },
};
