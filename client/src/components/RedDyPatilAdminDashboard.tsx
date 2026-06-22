import { useState, useEffect } from "react";
import type { AuthUser } from "../App";
import DashboardShell from "./DashboardShell";
import {
  LayoutDashboard, Calendar, CheckSquare, Users, Bell,
  BarChart2, Settings, Shield, Edit2, Trash2,
  UserPlus, AlertCircle, Activity, Eye, Plus, Loader
} from "lucide-react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Committees", id: "committees" },
  { icon: Calendar, label: "Events", id: "events" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
  { icon: Users, label: "Members", id: "members" },
  { icon: Bell, label: "Announcements", id: "announcements" },
  { icon: BarChart2, label: "Analytics", id: "analytics" },
  { icon: Settings, label: "Settings", id: "settings" },
];

interface Committee {
  _id: string;
  name: string;
  description: string;
  head: string;
  members: string[];
  status: "active" | "inactive";
  createdAt: string;
}

interface Event {
  _id: string;
  title: string;
  description: string;
  committee: string;
  date: string;
  startTime: string;
  location: string;
  attendees: number;
}

interface Task {
  _id: string;
  title: string;
  description: string;
  assignedTo: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: string;
  progress: number;
}

interface Announcement {
  _id: string;
  title: string;
  content: string;
  createdBy: string;
  createdAt: string;
}

const SAMPLE_EVENTS = [
  { date: "24", month: "MAY", name: "Tech Summit 2K25", org: "Technical Committee", time: "10:00 AM" },
  { date: "31", month: "MAY", name: "Innovation Workshop", org: "Innovation Club", time: "02:00 PM" },
  { date: "07", month: "JUN", name: "Cultural Fest", org: "Cultural Committee", time: "06:00 PM" },
];

const SAMPLE_TASKS = [
  { name: "Event Planning", pct: 75, color: "bg-red-500" },
  { name: "Sponsorship Drive", pct: 60, color: "bg-blue-500" },
  { name: "Social Media", pct: 40, color: "bg-yellow-400" },
  { name: "Marketing", pct: 90, color: "bg-green-500" },
];

const SAMPLE_COMMITTEES = [
  { name: "Technical Committee", members: 45, events: 8, status: "Active" },
  { name: "Cultural Committee", members: 32, events: 5, status: "Active" },
  { name: "Innovation Club", members: 28, events: 3, status: "Active" },
  { name: "Sports Committee", members: 60, events: 12, status: "Active" },
];

const iconColor: Record<string, string> = {
  red: "bg-red-100 text-red-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  yellow: "bg-yellow-100 text-yellow-600",
};

export default function RedDyPatilAdminDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [committees, setCommittees] = useState<Committee[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState<any>({});
  const [stats, setStats] = useState({
    committees: 24,
    events: 12,
    members: 1245,
    tasks: 18,
  });

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      if (activeTab === "committees") {
        const response = await axios.get(`${API_BASE_URL}/committees`, { headers });
        setCommittees(response.data.data || []);
      } else if (activeTab === "events") {
        const response = await axios.get(`${API_BASE_URL}/events`, { headers });
        setEvents(response.data.data || []);
      } else if (activeTab === "tasks") {
        const response = await axios.get(`${API_BASE_URL}/tasks`, { headers });
        setTasks(response.data.data || []);
      } else if (activeTab === "announcements") {
        const response = await axios.get(`${API_BASE_URL}/announcements`, { headers });
        setAnnouncements(response.data.data || []);
      }
    } catch (error) {
      console.error("Failed to load data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      if (activeTab === "committees") {
        await axios.post(`${API_BASE_URL}/committees`, formData, { headers });
      } else if (activeTab === "events") {
        await axios.post(`${API_BASE_URL}/events`, formData, { headers });
      } else if (activeTab === "tasks") {
        await axios.post(`${API_BASE_URL}/tasks`, formData, { headers });
      } else if (activeTab === "announcements") {
        await axios.post(`${API_BASE_URL}/announcements`, formData, { headers });
      }
      setFormData({});
      setShowAddModal(false);
      loadData();
    } catch (error) {
      console.error("Failed to add item:", error);
      alert("Failed to add item. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure?")) return;
    
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      let endpoint = "";
      if (activeTab === "committees") endpoint = `/committees/${id}`;
      else if (activeTab === "events") endpoint = `/events/${id}`;
      else if (activeTab === "tasks") endpoint = `/tasks/${id}`;
      else if (activeTab === "announcements") endpoint = `/announcements/${id}`;

      await axios.delete(`${API_BASE_URL}${endpoint}`, { headers });
      loadData();
    } catch (error) {
      console.error("Failed to delete item:", error);
      alert("Failed to delete item.");
    } finally {
      setLoading(false);
    }
  };

  const STATS = [
    { label: "Total Committees", value: stats.committees.toString(), sub: "Active Committees", icon: Users, color: "red" },
    { label: "Upcoming Events", value: stats.events.toString(), sub: "In Next 30 Days", icon: Calendar, color: "blue" },
    { label: "Active Members", value: stats.members.toString(), sub: "Across all committees", icon: Users, color: "green" },
    { label: "Pending Tasks", value: stats.tasks.toString(), sub: "Tasks to complete", icon: CheckSquare, color: "yellow" },
  ];

  return (
    <DashboardShell
      user={user}
      onLogout={onLogout}
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      roleLabel="Super Admin - Red Dy Patil"
      roleColor="red"
    >
      {/* Dashboard View */}
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl p-6 text-white flex items-center justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield size={18} className="text-red-200" />
                <span className="text-red-200 text-sm font-semibold">Red Dy Patil - Super Administrator</span>
              </div>
              <h2 className="text-3xl font-bold">Welcome back, {user.name.split(" ")[0]}! 👋</h2>
              <p className="text-red-100 text-sm mt-2">You have full control over all system operations and college activities.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur rounded-xl px-4 py-3 border border-white/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-white font-semibold">System Active</span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-xl p-5 border border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs text-gray-500 font-semibold uppercase">{label}</span>
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${iconColor[color]}`}>
                    <Icon size={18} />
                  </div>
                </div>
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-xs text-gray-400 mt-1">{sub}</div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Upcoming Events */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">📅 Upcoming Events</h3>
                <button className="text-red-600 hover:text-red-700 text-sm font-semibold">View All</button>
              </div>
              <div className="space-y-3">
                {SAMPLE_EVENTS.map((ev) => (
                  <div key={ev.name} className="flex items-center gap-4 p-3 hover:bg-gray-50 rounded-lg transition">
                    <div className="w-14 h-14 bg-gradient-to-br from-red-500 to-red-600 rounded-lg flex flex-col items-center justify-center flex-shrink-0 shadow-md">
                      <span className="text-white font-bold text-base">{ev.date}</span>
                      <span className="text-red-200 text-xs font-semibold">{ev.month}</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-gray-900">{ev.name}</div>
                      <div className="text-xs text-gray-500">{ev.org} • {ev.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks Overview */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-bold text-gray-900 text-lg">✓ Tasks Overview</h3>
                <button className="text-red-600 hover:text-red-700 text-sm font-semibold">View All</button>
              </div>
              <div className="space-y-4">
                {SAMPLE_TASKS.map((task) => (
                  <div key={task.name}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-700 font-medium">{task.name}</span>
                      <span className="text-xs text-gray-500 font-bold">{task.pct}%</span>
                    </div>
                    <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${task.color} transition-all duration-500`}
                        style={{ width: `${task.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Committees Table */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-gray-900 text-lg">👥 All Committees</h3>
              <button className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold text-sm shadow-md">
                <Plus size={16} />
                Add Committee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-3 px-2 text-xs text-gray-600 font-bold uppercase">Committee Name</th>
                    <th className="text-left py-3 px-2 text-xs text-gray-600 font-bold uppercase">Members</th>
                    <th className="text-left py-3 px-2 text-xs text-gray-600 font-bold uppercase">Events</th>
                    <th className="text-left py-3 px-2 text-xs text-gray-600 font-bold uppercase">Status</th>
                    <th className="text-left py-3 px-2 text-xs text-gray-600 font-bold uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {SAMPLE_COMMITTEES.map((c) => (
                    <tr key={c.name} className="border-b border-gray-100 hover:bg-red-50 transition">
                      <td className="py-3 px-2 font-semibold text-gray-900">{c.name}</td>
                      <td className="py-3 px-2 text-gray-600">{c.members}</td>
                      <td className="py-3 px-2 text-gray-600">{c.events}</td>
                      <td className="py-3 px-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          c.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3 px-2">
                        <button className="text-gray-400 hover:text-red-600 transition p-1">
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Committees Tab */}
      {activeTab === "committees" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Committees Management</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
            >
              <Plus size={18} /> Add Committee
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-red-600" size={32} />
            </div>
          ) : (
            <div className="grid gap-4">
              {committees.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                  <AlertCircle className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-600">No committees found. Create one to get started.</p>
                </div>
              ) : (
                committees.map((committee) => (
                  <div key={committee._id} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{committee.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{committee.description}</p>
                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                          <span>👥 {committee.members.length} Members</span>
                          <span className={`font-semibold ${committee.status === "active" ? "text-green-600" : "text-gray-600"}`}>
                            {committee.status === "active" ? "✓ Active" : "Inactive"}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(committee._id)}
                        className="text-gray-400 hover:text-red-600 transition p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Events Tab */}
      {activeTab === "events" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Events Management</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
            >
              <Plus size={18} /> Add Event
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-red-600" size={32} />
            </div>
          ) : (
            <div className="grid gap-4">
              {events.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                  <Calendar className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-600">No events found.</p>
                </div>
              ) : (
                events.map((event) => (
                  <div key={event._id} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-lg text-gray-900">{event.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{event.description}</p>
                        <div className="flex gap-4 mt-3 text-sm text-gray-500">
                          <span>📅 {new Date(event.date).toLocaleDateString()}</span>
                          <span>📍 {event.location}</span>
                          <span>👥 {event.attendees} Attendees</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(event._id)}
                        className="text-gray-400 hover:text-red-600 transition p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Tasks Tab */}
      {activeTab === "tasks" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Tasks Management</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
            >
              <Plus size={18} /> Add Task
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-red-600" size={32} />
            </div>
          ) : (
            <div className="grid gap-4">
              {tasks.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                  <CheckSquare className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-600">No tasks found.</p>
                </div>
              ) : (
                tasks.map((task) => (
                  <div key={task._id} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{task.title}</h3>
                        <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                        <div className="mt-3">
                          <div className="flex justify-between mb-1">
                            <span className="text-xs text-gray-600">Progress</span>
                            <span className="text-xs font-bold text-gray-600">{task.progress}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-red-500 rounded-full transition-all"
                              style={{ width: `${task.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="text-gray-400 hover:text-red-600 transition p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Announcements Tab */}
      {activeTab === "announcements" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Announcements</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md"
            >
              <Plus size={18} /> New Announcement
            </button>
          </div>

          {loading ? (
            <div className="flex justify-center py-12">
              <Loader className="animate-spin text-red-600" size={32} />
            </div>
          ) : (
            <div className="grid gap-4">
              {announcements.length === 0 ? (
                <div className="bg-white rounded-xl p-12 text-center border border-gray-200">
                  <Bell className="mx-auto mb-3 text-gray-400" size={32} />
                  <p className="text-gray-600">No announcements yet.</p>
                </div>
              ) : (
                announcements.map((announcement) => (
                  <div key={announcement._id} className="bg-white rounded-xl p-5 border border-gray-200 hover:shadow-lg transition">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg text-gray-900">{announcement.title}</h3>
                        <p className="text-gray-600 text-sm mt-2">{announcement.content}</p>
                        <div className="text-xs text-gray-400 mt-3">
                          By {announcement.createdBy} • {new Date(announcement.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDelete(announcement._id)}
                        className="text-gray-400 hover:text-red-600 transition p-2"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Members Tab */}
      {activeTab === "members" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Members Management</h2>
            <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition font-semibold shadow-md">
              <UserPlus size={18} /> Add Member
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">NAME</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">EMAIL</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ROLE</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">STATUS</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">JOINED</th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: "Dr. Rajesh Kumar", email: "rajesh@reddy-patil.edu", role: "Faculty Coordinator", status: "Active", joined: "2025-01-15" },
                  { id: 2, name: "Priya Singh", email: "priya@reddy-patil.edu", role: "Committee Head", status: "Active", joined: "2025-02-10" },
                  { id: 3, name: "Amit Patel", email: "amit@reddy-patil.edu", role: "Student", status: "Active", joined: "2025-03-05" },
                  { id: 4, name: "Neha Sharma", email: "neha@reddy-patil.edu", role: "Student", status: "Active", joined: "2025-03-12" },
                  { id: 5, name: "Vikram Das", email: "vikram@reddy-patil.edu", role: "Committee Head", status: "Inactive", joined: "2025-01-20" },
                ].map((member) => (
                  <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-4 px-4 text-sm font-medium text-gray-900">{member.name}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">{member.email}</td>
                    <td className="py-4 px-4 text-sm text-gray-600">
                      <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">{member.role}</span>
                    </td>
                    <td className="py-4 px-4 text-sm">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${member.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {member.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600">{member.joined}</td>
                    <td className="py-4 px-4 text-sm">
                      <button className="text-red-600 hover:text-red-700 font-semibold">Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Analytics Tab */}
      {activeTab === "analytics" && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics & Reports</h2>
          
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Committee Distribution */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-5">Committee Distribution</h3>
              <div className="space-y-4">
                {[
                  { name: "Technical Committee", count: 45, percent: 35 },
                  { name: "Cultural Committee", count: 32, percent: 25 },
                  { name: "Innovation Club", count: 28, percent: 22 },
                  { name: "Sports Committee", count: 20, percent: 18 },
                ].map((item) => (
                  <div key={item.name}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">{item.name}</span>
                      <span className="text-sm font-bold text-red-600">{item.count}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: `${item.percent}%` }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
              <h3 className="font-bold text-lg text-gray-900 mb-5">Recent Activity</h3>
              <div className="space-y-3">
                {[
                  { action: "Event Created", time: "2 hours ago", icon: Calendar },
                  { action: "Member Added", time: "5 hours ago", icon: UserPlus },
                  { action: "Task Completed", time: "1 day ago", icon: CheckSquare },
                  { action: "Announcement Posted", time: "2 days ago", icon: Bell },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                      <item.icon className="text-red-600" size={16} />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.action}</p>
                      <p className="text-xs text-gray-500">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Summary */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-600 text-sm font-semibold mb-1">Total Events</p>
                  <p className="text-3xl font-bold text-blue-900">28</p>
                  <p className="text-xs text-blue-600 mt-2">+5 this month</p>
                </div>
                <Calendar className="text-blue-400" size={40} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-600 text-sm font-semibold mb-1">Completion Rate</p>
                  <p className="text-3xl font-bold text-green-900">92%</p>
                  <p className="text-xs text-green-600 mt-2">+3% improvement</p>
                </div>
                <Activity className="text-green-400" size={40} />
              </div>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-600 text-sm font-semibold mb-1">Avg Attendance</p>
                  <p className="text-3xl font-bold text-purple-900">87%</p>
                  <p className="text-xs text-purple-600 mt-2">Excellent performance</p>
                </div>
                <Users className="text-purple-400" size={40} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {activeTab === "settings" && (
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">System Settings</h2>

          {/* General Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <Settings size={20} className="text-red-600" />
              General Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Institution Name</label>
                <input type="text" defaultValue="Red Dy Patil College" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                <input type="email" defaultValue="admin@reddy-patil.edu" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input type="tel" defaultValue="+91 XX XXX XXXXX" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <Shield size={20} className="text-red-600" />
              Security Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password</label>
                <input type="password" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none" />
              </div>
              <div className="flex items-center gap-3 pt-2">
                <input type="checkbox" id="2fa" className="w-4 h-4 text-red-600 rounded" />
                <label htmlFor="2fa" className="text-sm text-gray-700">Enable Two-Factor Authentication</label>
              </div>
            </div>
          </div>

          {/* Notification Settings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-md">
            <h3 className="font-bold text-lg text-gray-900 mb-5 flex items-center gap-2">
              <Bell size={20} className="text-red-600" />
              Notification Settings
            </h3>
            <div className="space-y-3">
              {[
                { label: "Event Notifications", enabled: true },
                { label: "Task Reminders", enabled: true },
                { label: "Member Updates", enabled: false },
                { label: "System Alerts", enabled: true },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">{setting.label}</span>
                  <div className={`relative w-11 h-6 rounded-full transition-colors ${setting.enabled ? "bg-red-600" : "bg-gray-300"}`}>
                    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${setting.enabled ? "translate-x-6" : "translate-x-1"}`}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold">Save Changes</button>
            <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold">Cancel</button>
          </div>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-gray-900">
                {activeTab === "committees" && "Add New Committee"}
                {activeTab === "events" && "Add New Event"}
                {activeTab === "tasks" && "Add New Task"}
                {activeTab === "announcements" && "Add New Announcement"}
              </h3>
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setFormData({});
                }}
                className="text-gray-400 hover:text-gray-600 transition"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddItem} className="space-y-4">
              {/* Committee Fields */}
              {activeTab === "committees" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Committee Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="e.g., Technical Committee"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Committee description"
                      rows={3}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Committee Head *</label>
                    <input
                      type="text"
                      required
                      value={formData.head || ""}
                      onChange={(e) => setFormData({ ...formData, head: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Head name"
                    />
                  </div>
                </>
              )}

              {/* Event Fields */}
              {activeTab === "events" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Event Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Event name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Event description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.date || ""}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      required
                      value={formData.location || ""}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Event venue"
                    />
                  </div>
                </>
              )}

              {/* Task Fields */}
              {activeTab === "tasks" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Task Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Task name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                    <textarea
                      required
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Task description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date *</label>
                    <input
                      type="date"
                      required
                      value={formData.dueDate || ""}
                      onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority *</label>
                    <select
                      required
                      value={formData.priority || "medium"}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </>
              )}

              {/* Announcement Fields */}
              {activeTab === "announcements" && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                    <input
                      type="text"
                      required
                      value={formData.title || ""}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Announcement title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                    <textarea
                      required
                      value={formData.content || ""}
                      onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-600 outline-none"
                      placeholder="Announcement content"
                      rows={4}
                    />
                  </div>
                </>
              )}

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition font-semibold disabled:bg-red-400 flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader className="animate-spin" size={16} />
                      Adding...
                    </>
                  ) : (
                    <>
                      <Plus size={16} />
                      Add
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setFormData({});
                  }}
                  className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardShell>
  );
}
