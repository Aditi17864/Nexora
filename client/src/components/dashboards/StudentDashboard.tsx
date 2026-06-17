import { useState } from "react";
import type { AuthUser } from "../../App";
import DashboardShell from "../DashboardShell";
import {
  LayoutDashboard, Users, TrendingUp, Award,
  AlertCircle, Star, BookOpen, Eye
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Users, label: "Committees", id: "committees" },
  { icon: BookOpen, label: "Events", id: "events" },
  { icon: Star, label: "My Participations", id: "participations" },
  { icon: Award, label: "Certificates", id: "certificates" },
];

const STATS = [
  { label: "My Committees", value: "3", sub: "Active memberships", icon: Users, color: "blue" },
  { label: "Events Attended", value: "8", sub: "This semester", icon: TrendingUp, color: "green" },
  { label: "Certificates", value: "5", sub: "Earned", icon: Award, color: "purple" },
  { label: "Attendance", value: "92%", sub: "Overall percentage", icon: BookOpen, color: "orange" },
];

const EVENTS = [
  { date: "24", month: "MAY", name: "TechFest 2K25", org: "Technical Committee", time: "10:00 AM", status: "Registered" },
  { date: "31", month: "MAY", name: "AI Workshop", org: "AI & DS Committee", time: "02:00 PM", status: "Interested" },
  { date: "07", month: "JUN", name: "Cultural Night", org: "Cultural Committee", time: "06:00 PM", status: "Registered" },
];

const iconColor: Record<string, string> = {
  purple: "bg-purple-100 text-purple-600",
  blue: "bg-blue-100 text-blue-600",
  green: "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
};

export default function StudentDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <DashboardShell
      user={user}
      onLogout={onLogout}
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
      roleLabel="Student"
      roleColor="blue"
    >
      {activeTab === "dashboard" && (
        <div className="space-y-6">
          {/* Welcome Banner */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-5 text-white flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold">Welcome, {user.name.split(" ")[0]}! 👋</h2>
              <p className="text-blue-100 text-sm mt-1">Keep up with your committees and events</p>
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

          {/* Events Grid */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Upcoming Events</h3>
              <button className="text-blue-600 text-sm font-medium hover:underline">View All</button>
            </div>
            <div className="space-y-3">
              {EVENTS.map((ev) => (
                <div key={ev.name} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                  <div className="w-12 h-12 bg-blue-600 rounded-xl flex flex-col items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm leading-none">{ev.date}</span>
                    <span className="text-blue-200 text-[10px] leading-none mt-0.5">{ev.month}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 text-sm">{ev.name}</div>
                    <div className="text-xs text-gray-400">{ev.org}</div>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      ev.status === "Registered" ? "bg-green-100 text-green-700" : "bg-orange-100 text-orange-700"
                    }`}>
                      {ev.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* My Committees */}
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">My Committees</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { name: "Technical Committee", members: 45, role: "Member" },
                { name: "Cultural Committee", members: 32, role: "Member" },
                { name: "AI & DS Committee", members: 28, role: "Lead Member" },
              ].map(c => (
                <div key={c.name} className="p-4 border border-gray-200 rounded-xl hover:shadow-md transition-all">
                  <h4 className="font-semibold text-gray-900">{c.name}</h4>
                  <p className="text-xs text-gray-400 mt-1">{c.members} members</p>
                  <span className="inline-block mt-2 text-xs font-semibold px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                    {c.role}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab !== "dashboard" && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle size={28} className="text-blue-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{activeTab}</h3>
          <p className="text-gray-400 text-sm">This section is under development.</p>
        </div>
      )}
    </DashboardShell>
  );
}
