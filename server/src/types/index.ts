import { Request } from "express";

export type UserRole = "super_admin" | "faculty_coordinator" | "committee_head" | "student";

export interface IUser {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  committeeId?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ICommittee {
  _id: string;
  committeeName: string;
  description: string;
  facultyCoordinator: string;
  committeeHead: string;
  members: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: string;
  title: string;
  description: string;
  date: Date;
  venue: string;
  organizerCommittee: string;
  participants: string[];
  budget: number;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  createdAt: Date;
  updatedAt: Date;
}

export interface ITask {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  assignedBy: string;
  deadline: Date;
  priority: "low" | "medium" | "high";
  status: "pending" | "in_progress" | "completed" | "overdue";
  createdAt: Date;
  updatedAt: Date;
}

export interface IAttendance {
  _id: string;
  userId: string;
  eventId: string;
  timestamp: Date;
  createdAt: Date;
}

export interface IAnnouncement {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: UserRole;
    email: string;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}
