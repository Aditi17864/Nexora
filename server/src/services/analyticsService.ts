import { Event } from "../models/Event";
import { Committee } from "../models/Committee";
import { Task } from "../models/Task";
import { User } from "../models/User";
import { Attendance } from "../models/Attendance";

export const analyticsService = {
  async getDashboardStats() {
    const totalCommittees = await Committee.countDocuments();
    const totalEvents = await Event.countDocuments();
    const totalUsers = await User.countDocuments();
    const upcomingEvents = await Event.countDocuments({ status: "upcoming" });
    const pendingTasks = await Task.countDocuments({ status: "pending" });
    const completedTasks = await Task.countDocuments({ status: "completed" });

    return {
      totalCommittees,
      totalEvents,
      totalUsers,
      upcomingEvents,
      pendingTasks,
      completedTasks,
      taskCompletionRate: totalTasks => {
        return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
      },
    };
  },

  async getAttendancePercentage(userId: string, eventId?: string) {
    const query: any = { userId };
    if (eventId) query.eventId = eventId;

    const attendanceCount = await Attendance.countDocuments(query);
    const totalEventsCount = await Event.countDocuments();

    return totalEventsCount > 0 ? Math.round((attendanceCount / totalEventsCount) * 100) : 0;
  },
};
