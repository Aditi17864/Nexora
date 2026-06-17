import { useState } from "react";
import type { AuthUser } from "../App";
import DashboardShell from "./DashboardShell";
import {
  LayoutDashboard, Calendar, CheckSquare, Users, Bell,
  BarChart2, Award, Settings, Shield,
  UserPlus, AlertCircle, Activity, Eye
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Committees", id: "committees" },
  { icon: Calendar, label: "Events", id: "events" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
  { icon: Users, label: "Attendance", id: "attendance" },
  { icon: Bell, label: "Announcements", id: "announcements" },
  { icon: BarChart2, label: "Analytics", id: "analytics" },
  { icon: Award, label: "Certificates", id: "certificates" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const STATS = [
  { label: "Total Committees", value: "24", sub: "Active Committees", icon: Users, color: "purple" },
  { label: "Upcoming Events", value: "12", sub: "In Next 30 Days", icon: Calendar, color: "blue" },
  { label: "Pending Tasks", value: "18", sub: "Tasks to complete", icon: CheckSquare, color: "green" },
  { label: "Active Members", value: "1,245", sub: "Across all committees", icon: Users, color: "orange" },
];

const EVENTS = [
  { date: "24", month: "MAY", name: "TechFest 2K25", org: "Technical Committee", time: "10:00 AM" },
  { date: "31", month: "MAY", name: "AI Workshop", org: "AI & DS Committee", time: "02:00 PM" },
  { date: "07", month: "JUN", name: "Cultural Night", org: "Cultural Committee", time: "06:00 PM" },
];

const TASKS = [
  { name: "Design Event Poster", pct: 75, color: "bg-blue-500" },
  { name: "Finalize Sponsorships", pct: 60, color: "bg-green-500" },
  { name: "Prepare Workshop Mate...", pct: 40, color: "bg-yellow-400" },
  { name: "Social Media Promotion", pct: 90, color: "bg-red-500" },
];

const COMMITTEES = [
  { name: "Technical Committee", members: 45, events: 8, status: "Active" },
  { name: "Cultural Committee", members: 32, events: 5, status: "Active" },
  { name: "AI & DS Committee", members: 28, events: 3, status: "Active" },
  { name: "Sports Committee", members: 60, events: 12, status: "Active" },
  { name: "Literary Committee", members: 22, events: 4, status: "Inactive" },
];

const iconColor: Record<string, string> = {
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
};

export default function SuperAdminDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <DashboardShell
      user={user}
      onLogout={onLogout}
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      roleLabel="Super Admin"
      roleColor="red"
    >
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-red-600 to-red-700 rounded-2xl p-5 text-white flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Shield size={16} className="text-red-200" />
                <span className="text-red-200 text-sm font-medium">Super Administrator</span>
              </div>
              <h2 className="text-2xl font-bold">Welcome back, {user.name.split(" ")[0]}!</h2>
              <p className="text-red-100 text-sm mt-1">You have full control over all system operations.</p>
            </div>
            <div className="hidden md:flex items-center gap-2 bg-white/10 rounded-xl px-4 py-2">
              <Activity size={16} className="text-white" />
              <span className="text-sm text-white font-medium">System Healthy</span>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map(({ label, value, sub, icon: Icon, color }) => (
              <div key={label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400 font-medium">{label}</span>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconColor[color]}`}>
                    <Icon size={15} />
                  </div>
                </div>
                <div className="text-2xl font-black text-gray-900">{value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
              </div>
            ))}
          </div>

          {/* Events + Tasks */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Upcoming Events</h3>
                <button className="text-red-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-3">
                {EVENTS.map(ev => (
                  <div key={ev.name} className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-600 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                      <span className="text-white font-bold text-sm leading-none">{ev.date}</span>
                      <span className="text-red-200 text-[10px] leading-none mt-0.5">{ev.month}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 text-sm">{ev.name}</div>
                      <div className="text-xs text-gray-400">{ev.org}</div>
                    </div>
                    <span className="text-xs text-gray-500 font-medium flex-shrink-0">{ev.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Tasks Overview</h3>
                <button className="text-red-600 text-sm font-medium hover:underline">View All</button>
              </div>
              <div className="space-y-4">
                {TASKS.map(task => (
                  <div key={task.name}>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-sm text-gray-700 font-medium">{task.name}</span>
                      <span className="text-xs text-gray-500 font-semibold">{task.pct}%</span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${task.color} transition-all`} style={{ width: `${task.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Committees Table */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">All Committees</h3>
              <button className="flex items-center gap-1.5 bg-red-600 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors">
                <UserPlus size={14} />
                Add Committee
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Name</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Members</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Events</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Status</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMITTEES.map(c => (
                    <tr key={c.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-medium text-gray-900">{c.name}</td>
                      <td className="py-3 text-gray-500">{c.members}</td>
                      <td className="py-3 text-gray-500">{c.events}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${c.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {c.status}
                        </span>
                      </td>
                      <td className="py-3">
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <Eye size={15} />
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

      {activeTab !== "dashboard" && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle size={28} className="text-red-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{activeTab}</h3>
          <p className="text-gray-400 text-sm">This section is under development.</p>
        </div>
      )}
    </DashboardShell>
  );
}
