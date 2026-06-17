import { Schema, model } from "mongoose";
import { IAttendance } from "../types";

const attendanceSchema = new Schema<IAttendance>(
  {
    userId: { type: String, required: true, ref: "User" },
    eventId: { type: String, required: true, ref: "Event" },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export const Attendance = model<IAttendance>("Attendance", attendanceSchema);
