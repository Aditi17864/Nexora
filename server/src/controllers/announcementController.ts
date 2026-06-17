import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { Announcement } from "../models/Announcement";

export const announcementController = {
  async createAnnouncement(req: AuthRequest, res: Response) {
    try {
      const { title, content } = req.body;
      const announcement = new Announcement({
        title,
        content,
        createdBy: req.user?.id,
      });
      await announcement.save();
      return sendSuccess(res, "Announcement created successfully", announcement, 201);
    } catch (error: any) {
      return sendError(res, "Failed to create announcement", error.message, 400);
    }
  },

  async getAnnouncements(req: AuthRequest, res: Response) {
    try {
      const announcements = await Announcement.find().sort({ createdAt: -1 });
      return sendSuccess(res, "Announcements fetched", announcements);
    } catch (error: any) {
      return sendError(res, "Failed to fetch announcements", error.message, 500);
    }
  },

  async deleteAnnouncement(req: AuthRequest, res: Response) {
    try {
      await Announcement.findByIdAndDelete(req.params.id);
      return sendSuccess(res, "Announcement deleted successfully");
    } catch (error: any) {
      return sendError(res, "Failed to delete announcement", error.message, 500);
    }
  },
};
