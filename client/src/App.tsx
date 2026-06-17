import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import DashboardPreview from "./components/DashboardPreview";
import LoginModal from "./components/LoginModal";
import SuperAdminDashboard from "./components/Superadmindashboard";
import StudentDashboard from "./components/dashboards/StudentDashboard";
import CommitteeHeadDashboard from "./components/dashboards/CommitteeHeadDashboard";

export type UserRole = "super_admin" | "student" | "committee_head" | null;

export interface AuthUser {
  role: UserRole;
  name: string;
  email: string;
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(null);

  const handleLogin = (user: AuthUser) => {
    setAuthUser(user);
    setShowLogin(false);
  };

  const handleLogout = () => {
    setAuthUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("user");
  };

  if (authUser) {
    if (authUser.role === "super_admin") {
      return <SuperAdminDashboard user={authUser} onLogout={handleLogout} />;
    }
    if (authUser.role === "committee_head") {
      return <CommitteeHeadDashboard user={authUser} onLogout={handleLogout} />;
    }
    if (authUser.role === "student") {
      return <StudentDashboard user={authUser} onLogout={handleLogout} />;
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar onLoginClick={() => setShowLogin(true)} />
      <Hero onGetStarted={() => setShowLogin(true)} />
      <DashboardPreview />
      <Features />
      {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLogin={handleLogin}
        />
      )}
    </div>
  );
}
