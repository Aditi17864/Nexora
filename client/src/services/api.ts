import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add token to every request
apiClient.interceptors.request.use((config: any) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data: { name: string; email: string; password: string; role: string }) =>
    apiClient.post("/auth/register", data),
  login: (data: { email: string; password: string }) =>
    apiClient.post("/auth/login", data),
  logout: () => apiClient.post("/auth/logout"),
};

// User APIs
export const userAPI = {
  getProfile: () => apiClient.get("/users/profile"),
  getAllUsers: () => apiClient.get("/users"),
  updateUser: (id: string, data: any) => apiClient.put(`/users/${id}`, data),
  deleteUser: (id: string) => apiClient.delete(`/users/${id}`),
};

// Committee APIs
export const committeeAPI = {
  createCommittee: (data: any) => apiClient.post("/committees", data),
  getCommittees: () => apiClient.get("/committees"),
  getCommitteeById: (id: string) => apiClient.get(`/committees/${id}`),
  updateCommittee: (id: string, data: any) => apiClient.put(`/committees/${id}`, data),
  deleteCommittee: (id: string) => apiClient.delete(`/committees/${id}`),
  addMember: (id: string, userId: string) =>
    apiClient.post(`/committees/${id}/members/add`, { userId }),
  removeMember: (id: string, userId: string) =>
    apiClient.post(`/committees/${id}/members/remove`, { userId }),
};

// Event APIs
export const eventAPI = {
  createEvent: (data: any) => apiClient.post("/events", data),
  getEvents: () => apiClient.get("/events"),
  getUpcomingEvents: () => apiClient.get("/events/upcoming"),
  getEventById: (id: string) => apiClient.get(`/events/${id}`),
  updateEvent: (id: string, data: any) => apiClient.put(`/events/${id}`, data),
  deleteEvent: (id: string) => apiClient.delete(`/events/${id}`),
  registerParticipant: (id: string) => apiClient.post(`/events/${id}/register`),
};

// Task APIs
export const taskAPI = {
  createTask: (data: any) => apiClient.post("/tasks", data),
  getTasks: () => apiClient.get("/tasks"),
  getTaskById: (id: string) => apiClient.get(`/tasks/${id}`),
  updateTask: (id: string, data: any) => apiClient.put(`/tasks/${id}`, data),
  deleteTask: (id: string) => apiClient.delete(`/tasks/${id}`),
};

// Attendance APIs
export const attendanceAPI = {
  markAttendance: (eventId: string) => apiClient.post("/attendance/mark", { eventId }),
  getAttendance: (eventId?: string) =>
    apiClient.get("/attendance", { params: { eventId } }),
  getUserAttendance: (userId: string) => apiClient.get(`/attendance/user/${userId}`),
};

// Announcement APIs
export const announcementAPI = {
  createAnnouncement: (data: any) => apiClient.post("/announcements", data),
  getAnnouncements: () => apiClient.get("/announcements"),
  deleteAnnouncement: (id: string) => apiClient.delete(`/announcements/${id}`),
};
