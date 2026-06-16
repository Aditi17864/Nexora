const DashboardPreview = () => {
  const upcomingEvents = [
    { date: '24 MAY', name: 'TechFest 2K25', org: 'Organized by Technical Committee', time: '10:00 AM' },
    { date: '31 MAY', name: 'AI Workshop', org: 'Organized by AI & DS Committee', time: '02:00 PM' },
    { date: '07 JUN', name: 'Cultural Night', org: 'Organized by Cultural Committee', time: '06:00 PM' },
  ];

  const tasks = [
    { name: 'Design Event Poster', committee: 'Technical Committee', progress: 75, color: 'bg-blue-500' },
    { name: 'Finalize Sponsorships', committee: 'Management Committee', progress: 60, color: 'bg-green-500' },
    { name: 'Prepare Workshop Material', committee: 'AI & DS Committee', progress: 40, color: 'bg-yellow-500' },
    { name: 'Social Media Promotion', committee: 'Cultural Committee', progress: 90, color: 'bg-red-500' },
  ];

  const navItems = [
    { icon: '⊞', label: 'Dashboard', active: true },
    { icon: '👥', label: 'Committees' },
    { icon: '📅', label: 'Events' },
    { icon: '✅', label: 'Tasks' },
    { icon: '📊', label: 'Attendance' },
    { icon: '📣', label: 'Announcements' },
    { icon: '📈', label: 'Analytics' },
    { icon: '🏅', label: 'Certificates' },
    { icon: '⚙️', label: 'Settings' },
  ];

  return (
    <div className="relative w-full max-w-3xl mx-auto shadow-2xl rounded-2xl overflow-hidden border border-gray-200 bg-white text-xs">
      <div className="flex h-[420px]">
        {/* Sidebar */}
        <div className="w-36 bg-red-600 flex flex-col py-4 shrink-0">
          <div className="px-4 mb-4 flex items-center gap-1">
            <div className="w-5 h-5 bg-white/20 rounded flex items-center justify-center">
              <span className="text-white text-[10px]">N</span>
            </div>
            <span className="text-white font-bold text-sm">NEXORA</span>
          </div>
          <nav className="flex flex-col gap-0.5 px-2">
            {navItems.map((item) => (
              <div
                key={item.label}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  item.active ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10'
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="text-[11px] font-medium">{item.label}</span>
              </div>
            ))}
          </nav>
          {/* Stay Organized Card */}
          <div className="mt-auto mx-2 bg-white/15 rounded-xl p-3">
            <div className="w-8 h-8 bg-white/20 rounded-lg mb-2 flex items-center justify-center">
              <span className="text-base">📋</span>
            </div>
            <p className="text-white text-[10px] font-semibold">Stay Organized</p>
            <p className="text-white/70 text-[9px] mt-0.5">Use Nexora to stay on top of your tasks.</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden bg-gray-50">
          {/* Top Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
            <div>
              <p className="font-semibold text-gray-800 text-sm">Hello, Aditi 👋</p>
              <p className="text-gray-400 text-[10px]">Welcome back to your dashboard</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-1.5 text-gray-400 text-[11px]">
                <span>🔍</span> Search anything...
              </div>
              <div className="w-7 h-7 bg-red-100 rounded-full flex items-center justify-center text-red-600">
                🔔
              </div>
              <div className="w-7 h-7 rounded-full bg-red-600 flex items-center justify-center text-white text-[10px] font-bold">A</div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-4 gap-3 px-5 pt-4">
            {[
              { label: 'Total Committees', value: '24', sub: 'Active Committees', icon: '👥', color: 'text-blue-500' },
              { label: 'Upcoming Events', value: '12', sub: 'In Next 30 Days', icon: '📅', color: 'text-purple-500' },
              { label: 'Pending Tasks', value: '18', sub: 'Tasks to complete', icon: '✅', color: 'text-orange-500' },
              { label: 'Active Members', value: '1,245', sub: 'Across all committees', icon: '🧑‍🤝‍🧑', color: 'text-green-500' },
            ].map((stat) => (
              <div key={stat.label} className="bg-white rounded-xl p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-gray-400">{stat.label}</span>
                  <span className={`text-base ${stat.color}`}>{stat.icon}</span>
                </div>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
                <p className="text-[9px] text-gray-400">{stat.sub}</p>
              </div>
            ))}
          </div>

          {/* Bottom Two Columns */}
          <div className="flex gap-3 px-5 py-3 overflow-hidden flex-1">
            {/* Left Column */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* Upcoming Events */}
              <div className="bg-white rounded-xl p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-700 text-[11px]">Upcoming Events</p>
                  <span className="text-red-500 text-[10px] cursor-pointer">View All</span>
                </div>
                <div className="flex flex-col gap-2">
                  {upcomingEvents.map((ev) => (
                    <div key={ev.name} className="flex items-center gap-2">
                      <div className="bg-red-50 text-red-600 rounded-lg px-2 py-1 text-center shrink-0 w-12">
                        <p className="text-[9px] font-bold leading-none">{ev.date.split(' ')[0]}</p>
                        <p className="text-[9px] leading-none">{ev.date.split(' ')[1]}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-700 text-[10px] truncate">{ev.name}</p>
                        <p className="text-gray-400 text-[9px] truncate">{ev.org}</p>
                      </div>
                      <span className="text-gray-400 text-[9px] shrink-0">{ev.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance Overview */}
              <div className="bg-white rounded-xl p-3 border border-gray-100 flex items-center gap-4">
                <div>
                  <p className="font-semibold text-gray-700 text-[11px] mb-2">Attendance Overview</p>
                  <div className="relative w-16 h-16">
                    <svg viewBox="0 0 36 36" className="w-16 h-16 -rotate-90">
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#f3f4f6" strokeWidth="4" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#3b82f6" strokeWidth="4"
                        strokeDasharray="65.97 22.00" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#ef4444" strokeWidth="4"
                        strokeDasharray="12.56 75.41" strokeDashoffset="-65.97" strokeLinecap="round" />
                      <circle cx="18" cy="18" r="14" fill="none" stroke="#f59e0b" strokeWidth="4"
                        strokeDasharray="3.77 84.20" strokeDashoffset="-78.54" strokeLinecap="round" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-gray-700">78%</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {[
                    { label: 'Present', val: '78%', color: 'bg-blue-500' },
                    { label: 'Absent', val: '18%', color: 'bg-red-500' },
                    { label: 'Leave', val: '4%', color: 'bg-yellow-500' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-[10px] text-gray-500">{item.label}</span>
                      <span className="text-[10px] font-semibold text-gray-700">{item.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="flex-1 flex flex-col gap-3 min-w-0">
              {/* Tasks Overview */}
              <div className="bg-white rounded-xl p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-700 text-[11px]">Tasks Overview</p>
                  <span className="text-red-500 text-[10px] cursor-pointer">View All</span>
                </div>
                <div className="flex flex-col gap-2">
                  {tasks.map((task) => (
                    <div key={task.name}>
                      <div className="flex justify-between mb-0.5">
                        <p className="text-[10px] text-gray-600 truncate max-w-[120px]">{task.name}</p>
                        <p className="text-[10px] text-gray-400">{task.progress}%</p>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className={`${task.color} h-1.5 rounded-full`}
                          style={{ width: `${task.progress}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Committee Activity */}
              <div className="bg-white rounded-xl p-3 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-semibold text-gray-700 text-[11px]">Committee Activity</p>
                  <span className="text-red-500 text-[10px] cursor-pointer">View All</span>
                </div>
                {[
                  { name: 'Technical Committee', action: 'published an announcement', time: '2h ago', color: 'bg-blue-500' },
                  { name: 'Cultural Committee', action: 'added a new event', time: '5h ago', color: 'bg-purple-500' },
                  { name: 'Management Committee', action: 'completed a task', time: '1d ago', color: 'bg-green-500' },
                ].map((act) => (
                  <div key={act.name} className="flex items-center gap-2 py-1">
                    <div className={`w-5 h-5 ${act.color} rounded flex items-center justify-center text-white text-[8px] font-bold shrink-0`}>
                      {act.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] font-medium text-gray-700 truncate">{act.name}</p>
                      <p className="text-[9px] text-gray-400">{act.action}</p>
                    </div>
                    <span className="text-[9px] text-gray-400 shrink-0">{act.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPreview;