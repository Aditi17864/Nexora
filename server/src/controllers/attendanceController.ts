import { Response } from "express";
import { AuthRequest } from "../types";
import { sendSuccess, sendError } from "../utils/response";
import { Attendance } from "../models/Attendance";
import { Event } from "../models/Event";

export const attendanceController = {
  async markAttendance(req: AuthRequest, res: Response) {
    try {
      const { eventId } = req.body;
      const attendance = new Attendance({
        userId: req.user?.id,
        eventId,
      });
      await attendance.save();
      return sendSuccess(res, "Attendance marked successfully", attendance, 201);
    } catch (error: any) {
      return sendError(res, "Failed to mark attendance", error.message, 400);
    }
  },

  async getAttendance(req: AuthRequest, res: Response) {
    try {
      const { eventId } = req.query;
      const query: any = {};
      if (eventId) query.eventId = eventId;

      const attendance = await Attendance.find(query);
      return sendSuccess(res, "Attendance fetched", attendance);
    } catch (error: any) {
      return sendError(res, "Failed to fetch attendance", error.message, 500);
    }
  },

  async getUserAttendance(req: AuthRequest, res: Response) {
    try {
      const { userId } = req.params;
      const attendance = await Attendance.find({ userId });
      const totalEvents = await Event.countDocuments();
      const percentage = totalEvents > 0 ? Math.round((attendance.length / totalEvents) * 100) : 0;

      return sendSuccess(res, "User attendance fetched", { attendance, percentage });
    } catch (error: any) {
      return sendError(res, "Failed to fetch user attendance", error.message, 500);
    }
  },
};
