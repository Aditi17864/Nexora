import { useState } from "react";
import type { AuthUser } from "../App";
import DashboardShell from "./DashboardShell";
import {
  LayoutDashboard, Calendar, CheckSquare, Users,
  Bell, BarChart2, Settings, Plus, Edit2, Trash2,
  Clock, MapPin, AlertCircle, Star
} from "lucide-react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: Calendar, label: "My Events", id: "events" },
  { icon: Plus, label: "Post Event", id: "post_event" },
  { icon: CheckSquare, label: "Tasks", id: "tasks" },
  { icon: Users, label: "Members", id: "members" },
  { icon: Bell, label: "Announcements", id: "announcements" },
  { icon: BarChart2, label: "Reports", id: "reports" },
  { icon: Settings, label: "Settings", id: "settings" },
];

const MY_EVENTS = [
  { id: 1, name: "TechFest 2K25", date: "24 May 2025", time: "10:00 AM", venue: "Main Auditorium", status: "Approved", attendees: 320 },
  { id: 2, name: "Hackathon Spring", date: "15 Jun 2025", time: "09:00 AM", venue: "CS Lab Block", status: "Pending", attendees: 150 },
  { id: 3, name: "AI Workshop", date: "31 May 2025", time: "02:00 PM", venue: "Seminar Hall", status: "Approved", attendees: 80 },
];

const TASKS = [
  { task: "Book venue for Hackathon", due: "May 20", priority: "High", done: false },
  { task: "Send invitations", due: "May 22", priority: "Medium", done: true },
  { task: "Arrange sponsors", due: "May 25", priority: "High", done: false },
  { task: "Prepare registration form", due: "May 18", priority: "Low", done: true },
];

const statusBadge: Record<string, string> = {
  Approved: "bg-green-100 text-green-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Rejected: "bg-red-100 text-red-600",
};

export default function CommitteeHeadDashboard({ user, onLogout }: { user: AuthUser; onLogout: () => void }) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [form, setForm] = useState({ name: "", date: "", time: "", venue: "", description: "", category: "" });
  const [posted, setPosted] = useState(false);

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    setPosted(true);
    setTimeout(() => { setPosted(false); setForm({ name: "", date: "", time: "", venue: "", description: "", category: "" }); }, 2500);
  };

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
          {/* Banner */}
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-1">
              <Star size={16} className="text-orange-200" />
              <span className="text-orange-100 text-sm font-medium">Technical Committee Head</span>
            </div>
            <h2 className="text-2xl font-bold">Hello, {user.name.split(" ")[0]}!</h2>
            <p className="text-orange-100 text-sm mt-1">You have 2 events pending approval and 3 tasks due this week.</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "My Events", value: "8", sub: "This semester", color: "orange" },
              { label: "Approved", value: "6", sub: "Events approved", color: "green" },
              { label: "Pending", value: "2", sub: "Awaiting approval", color: "yellow" },
              { label: "Members", value: "45", sub: "In your committee", color: "blue" },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl p-4 border border-gray-100 shadow-sm">
                <div className="text-xs text-gray-400 font-medium mb-2">{s.label}</div>
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
              </div>
            ))}
          </div>

          {/* Quick post + tasks */}
          <div className="grid lg:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">My Events</h3>
                <button onClick={() => setActiveTab("post_event")} className="flex items-center gap-1.5 bg-orange-500 text-white text-xs px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">
                  <Plus size={12} /> Post Event
                </button>
              </div>
              <div className="space-y-3">
                {MY_EVENTS.map(ev => (
                  <div key={ev.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{ev.name}</div>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-gray-400 flex items-center gap-1"><Clock size={10} />{ev.date}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1"><MapPin size={10} />{ev.venue}</span>
                      </div>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${statusBadge[ev.status]}`}>{ev.status}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">My Tasks</h3>
              <div className="space-y-2.5">
                {TASKS.map(t => (
                  <div key={t.task} className={`flex items-center gap-3 p-3 rounded-xl ${t.done ? "bg-green-50" : "bg-gray-50"}`}>
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 flex items-center justify-center
                      ${t.done ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                      {t.done && <div className="w-2 h-2 bg-white rounded-full" />}
                    </div>
                    <div className="flex-1">
                      <span className={`text-sm font-medium ${t.done ? "line-through text-gray-400" : "text-gray-800"}`}>{t.task}</span>
                      <div className="text-xs text-gray-400 mt-0.5">Due: {t.due}</div>
                    </div>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-semibold flex-shrink-0
                      ${t.priority === "High" ? "bg-red-100 text-red-600" :
                        t.priority === "Medium" ? "bg-yellow-100 text-yellow-700" :
                        "bg-gray-100 text-gray-500"}`}>
                      {t.priority}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === "post_event" && (
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                <Plus size={20} className="text-orange-600" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Post New Event</h2>
                <p className="text-sm text-gray-400">Fill in the details and submit for admin approval</p>
              </div>
            </div>

            {posted && (
              <div className="mb-4 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2">
                <CheckSquare size={16} /> Event submitted successfully! Awaiting admin approval.
              </div>
            )}

            <form onSubmit={handlePost} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Event Name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="e.g. Annual Hackathon 2025"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date *</label>
                  <input required type="date" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Time *</label>
                  <input required type="time" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Venue *</label>
                  <input required value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))}
                    placeholder="e.g. Main Auditorium"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm bg-white">
                    <option value="">Select category</option>
                    <option>Technical</option>
                    <option>Cultural</option>
                    <option>Sports</option>
                    <option>Workshop</option>
                    <option>Seminar</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                  <textarea required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                    rows={4} placeholder="Describe the event, its objectives, and what attendees can expect..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-400 text-sm resize-none" />
                </div>
              </div>
              <button type="submit"
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2">
                <Plus size={16} /> Submit Event for Approval
              </button>
            </form>
          </div>
        </div>
      )}

      {activeTab === "events" && (
        <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">My Events</h3>
            <button onClick={() => setActiveTab("post_event")} className="flex items-center gap-1.5 bg-orange-500 text-white text-sm px-3 py-1.5 rounded-lg hover:bg-orange-600 transition-colors">
              <Plus size={14} /> Post New Event
            </button>
          </div>
          <div className="space-y-3">
            {MY_EVENTS.map(ev => (
              <div key={ev.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition-colors">
                <div>
                  <div className="font-semibold text-gray-900">{ev.name}</div>
                  <div className="flex items-center gap-4 mt-1">
                    <span className="text-sm text-gray-400">{ev.date} · {ev.time}</span>
                    <span className="text-sm text-gray-400">{ev.venue}</span>
                    <span className="text-sm text-gray-500">{ev.attendees} attendees</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded-full font-semibold ${statusBadge[ev.status]}`}>{ev.status}</span>
                  <button className="text-gray-400 hover:text-orange-500 transition-colors"><Edit2 size={15} /></button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {!["dashboard", "post_event", "events"].includes(activeTab) && (
        <div className="flex flex-col items-center justify-center h-64 text-center">
          <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center mb-4">
            <AlertCircle size={28} className="text-orange-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1 capitalize">{activeTab.replace("_", " ")}</h3>
          <p className="text-gray-400 text-sm">This section is under development.</p>
        </div>
      )}
    </DashboardShell>
  );
}
