import { useState } from "react";
import type { AuthUser } from "../App";
import { Menu, Bell, LogOut, User, Settings } from "lucide-react";

interface DashboardShellProps {
  user: AuthUser;
  onLogout: () => void;
  navItems: Array<{ icon: any; label: string; id: string }>;
  activeTab: string;
  onTabChange: (tab: string) => void;
  roleLabel: string;
  roleColor: "red" | "orange" | "blue";
  children: React.ReactNode;
}

const roleStyles: Record<string, { bg: string; text: string; border: string }> = {
  red: { bg: "bg-red-600", text: "text-red-600", border: "border-red-600" },
  orange: { bg: "bg-orange-500", text: "text-orange-500", border: "border-orange-500" },
  blue: { bg: "bg-blue-600", text: "text-blue-600", border: "border-blue-600" },
};

export default function DashboardShell({
  user,
  onLogout,
  navItems,
  activeTab,
  onTabChange,
  roleLabel,
  roleColor,
  children,
}: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const style = roleStyles[roleColor];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside
        className={`${style.bg} text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-20"
        } fixed h-screen left-0 top-0 overflow-y-auto`}
      >
        <div className="p-4 flex items-center justify-between border-b border-white/10">
          <div className={`flex items-center gap-3 ${!sidebarOpen && "hidden"}`}>
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center font-bold">
              <svg width="24" height="24" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10L80 30L85 60L70 95L50 110L30 95L15 60L20 30Z" fill="white" opacity="0.9" />
                <path d="M40 50L50 40L60 50L55 65L50 68L45 65Z" fill="#DC2626" />
                <line x1="50" y1="20" x2="50" y2="35" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                <line x1="35" y1="28" x2="45" y2="38" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                <line x1="65" y1="28" x2="55" y2="38" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h1 className="font-bold text-lg">Red Dy Patil</h1>
              <p className="text-xs opacity-75">Committee Mgmt</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 hover:bg-white/10 rounded"
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`w-full px-4 py-3 flex items-center gap-3 transition-all ${
                  activeTab === item.id
                    ? "bg-white/20 border-r-4 border-white"
                    : "hover:bg-white/10"
                }`}
              >
                <Icon size={20} />
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4">
          <button
            onClick={onLogout}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-all ${
              !sidebarOpen && "justify-center"
            }`}
          >
            <LogOut size={20} />
            {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-20"}`}>
        {/* Top Bar */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
          <div className="px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Dashboard</h2>
              <p className="text-xs text-gray-400">{roleLabel}</p>
            </div>

            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell size={20} className="text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <div className={`w-8 h-8 ${style.bg} rounded-full flex items-center justify-center text-white font-bold`}>
                    {user.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-400">{roleLabel}</p>
                  </div>
                </button>

                {showProfileMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200">
                    <button className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50">
                      <User size={16} />
                      <span className="text-sm">Profile</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-gray-50">
                      <Settings size={16} />
                      <span className="text-sm">Settings</span>
                    </button>
                    <hr className="my-2" />
                    <button
                      onClick={onLogout}
                      className="w-full px-4 py-2 text-left flex items-center gap-2 hover:bg-red-50 text-red-600"
                    >
                      <LogOut size={16} />
                      <span className="text-sm">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
