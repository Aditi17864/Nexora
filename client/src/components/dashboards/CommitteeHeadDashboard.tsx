import { useState } from "react";
import type { AuthUser } from "../../App";
import DashboardShell from "../DashboardShell";
import {
  LayoutDashboard, Calendar, CheckSquare, Users, Bell,
  AlertCircle, Plus, Eye, Edit2
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Calendar, label: "My Events", id: "events" },
  { icon: Users, label: "Committee", id: "committee" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
  { icon: Bell, label: "Announcements", id: "announcements" },
];

const STATS = [
  { label: "Events Created", value: "6", sub: "This semester", icon: Calendar, color: "orange" },
  { label: "Participants", value: "342", sub: "Total registrations", icon: Users, color: "green" },
  { label: "Pending Tasks", value: "4", sub: "To be completed", icon: CheckSquare, color: "red" },
  { label: "Committee Members", value: "28", sub: "Active members", icon: Users, color: "purple" },
];

const EVENTS = [
  { date: "24", month: "MAY", name: "TechFest 2K25", participants: 145, status: "Upcoming" },
  { date: "31", month: "MAY", name: "AI Workshop", participants: 89, status: "Upcoming" },
  { date: "07", month: "JUN", name: "Tech Hackathon", participants: 203, status: "Planning" },
];

const iconColor: Record<string, string> = {
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  red: "bg-red-100 text-red-600",
};

export default function CommitteeHeadDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <DashboardShell
      user={user}
      onLogout={onLogout}
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      roleLabel="Committee Head"
      roleColor="orange"
    >
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user.name.split(" ")[0]}! 🎉</h2>
              <p className="text-orange-100 text-sm mt-1">Manage your committee events and members</p>
            </div>
            <button className="flex items-center gap-2 bg-white text-orange-600 px-4 py-2 rounded-lg font-semibold hover:bg-orange-50">
              <Plus size={18} />
              Create Event
            </button>
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

          {/* Events Table */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Your Events</h3>
              <button className="text-orange-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Event</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Date</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Participants</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Status</th>
                    <th className="text-left py-2 text-xs text-gray-400 font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {EVENTS.map(e => (
                    <tr key={e.name} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                      <td className="py-3 font-medium text-gray-900">{e.name}</td>
                      <td className="py-3 text-gray-500">{e.date} {e.month}</td>
                      <td className="py-3 text-gray-500">{e.participants}</td>
                      <td className="py-3">
                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                          e.status === "Upcoming" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"
                        }`}>
                          {e.status}
                        </span>
                      </td>
                      <td className="py-3 flex gap-2">
                        <button className="text-gray-400 hover:text-orange-600 transition-colors">
                          <Eye size={15} />
                        </button>
                        <button className="text-gray-400 hover:text-orange-600 transition-colors">
                          <Edit2 size={15} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Committee Members</h3>
              <div className="space-y-3">
                {[
                  { name: "Rajesh Kumar", role: "Faculty Coordinator" },
                  { name: "Priya Sharma", role: "Co-Head" },
                  { name: "Anil Kumar", role: "Member" },
                  { name: "Sneha Patil", role: "Member" },
                ].map((member, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2 border border-gray-100 rounded-lg">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{member.name}</p>
                      <p className="text-xs text-gray-400">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Recent Announcements</h3>
              <div className="space-y-3">
                {[
                  "Upcoming TechFest registration closing soon",
                  "Committee meeting scheduled for May 25",
                  "New members orientation on May 20",
                ].map((announcement, idx) => (
                  <div key={idx} className="p-2 border border-gray-100 rounded-lg">
                    <p className="text-sm text-gray-700">{announcement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "dashboard" && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle size={28} className="text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{activeTab}</h3>
          <p className="text-gray-400 text-sm">This section is under development.</p>
        </div>
      )}
    </DashboardShell>
  );
}
