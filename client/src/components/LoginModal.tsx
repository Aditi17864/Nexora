import { useState } from "react";
import type { AuthUser, UserRole } from "../App";
import { X, Eye, EyeOff, Shield, User, Users } from "lucide-react";
import { authAPI } from "../services/api";

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: AuthUser) => void;
}

const MOCK_CREDENTIALS: Record<string, { password: string; name: string; role: UserRole }> = {
  "admin@nexora.edu": { password: "admin123", name: "Dr. Rajesh Kumar", role: "super_admin" },
  "head@nexora.edu": { password: "head123", name: "Priya Sharma", role: "committee_head" },
  "student@nexora.edu": { password: "student123", name: "Aditya Patil", role: "student" },
};

const ROLE_INFO = [
  { role: "super_admin" as UserRole, label: "Super Admin", icon: Shield, color: "red", email: "admin@nexora.edu", password: "admin123", desc: "Full system control" },
  { role: "committee_head" as UserRole, label: "Committee Head", icon: Users, color: "orange", email: "head@nexora.edu", password: "head123", desc: "Post & manage events" },
  { role: "student" as UserRole, label: "Student", icon: User, color: "blue", email: "student@nexora.edu", password: "student123", desc: "View events & attendance" },
];

export default function LoginModal({ onClose, onLogin }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // Try to login via API
      const response = await authAPI.login({ email, password });
      const { data } = response.data;
      
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshToken", data.refreshToken);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        onLogin({
          role: data.user.role,
          name: data.user.name,
          email: data.user.email,
        });
      }
    } catch (err: any) {
      // Fallback to mock credentials for demo
      const cred = MOCK_CREDENTIALS[email.toLowerCase()];
      if (cred && cred.password === password) {
        localStorage.setItem("user", JSON.stringify({ role: cred.role, name: cred.name, email }));
        onLogin({ role: cred.role, name: cred.name, email });
      } else {
        setError("Invalid email or password. Try: admin@nexora.edu / head@nexora.edu / student@nexora.edu");
      }
    } finally {
      setLoading(false);
    }
  };

  const fillCredentials = (email: string, pwd: string) => {
    setEmail(email);
    setPassword(pwd);
    setError("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-red-700 px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <svg width="24" height="28" viewBox="0 0 100 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M50 10L80 30L85 60L70 95L50 110L30 95L15 60L20 30Z" fill="white" />
                <path d="M40 50L50 40L60 50L55 65L50 68L45 65Z" fill="#DC2626" />
                <line x1="50" y1="20" x2="50" y2="35" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                <line x1="35" y1="28" x2="45" y2="38" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
                <line x1="65" y1="28" x2="55" y2="38" stroke="#DC2626" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <div>
              <h2 className="text-white font-bold text-xl">Welcome Back</h2>
              <p className="text-red-100 text-sm">Sign in to Red Dy Patil</p>
            </div>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          {/* Quick login pills */}
          <p className="text-xs text-gray-400 uppercase tracking-wider font-semibold mb-3">Quick Demo Access</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {ROLE_INFO.map(({ label, icon: Icon, email, password, desc, color }) => (
              <button
                key={label}
                onClick={() => fillCredentials(email, password)}
                className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 transition-all hover:scale-105
                  ${color === "red" ? "border-red-200 hover:border-red-500 hover:bg-red-50" :
                    color === "orange" ? "border-orange-200 hover:border-orange-500 hover:bg-orange-50" :
                    "border-blue-200 hover:border-blue-500 hover:bg-blue-50"}`}
              >
                <Icon size={18} className={color === "red" ? "text-red-600" : color === "orange" ? "text-orange-500" : "text-blue-500"} />
                <span className="text-xs font-semibold text-gray-700 text-center leading-tight">{label}</span>
                <span className="text-[10px] text-gray-400 text-center">{desc}</span>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm transition-all pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
