import { useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../../context/authContext";

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: "⌂",
  },
  {
    label: "Membership Plans",
    path: "/membership-plans",
    icon: "◇",
  },
  {
    label: "My Membership",
    path: "/my-membership",
    icon: "▣",
  },
  {
    label: "AI Diet Plan",
    path: "/diet-plan",
    icon: "✦",
  },
  {
    label: "Profile",
    path: "/profile",
    icon: "○",
  },
];

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
    navigate("/");
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <aside className="hidden md:flex w-[270px] min-h-screen flex-col bg-[#111118] text-white border-r border-white/[0.06]">
      {/* Brand */}
      <div className="px-6 pt-7 pb-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 text-left group"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/30 group-hover:scale-105 transition-transform duration-200">
            <span className="text-xl font-black">S</span>
          </div>

          <div>
            <h1 className="text-[17px] font-bold tracking-tight">
              Smart Gym
            </h1>

            <p className="text-[11px] text-slate-500 mt-0.5 tracking-wide">
              FITNESS MANAGEMENT
            </p>
          </div>
        </button>
      </div>

      {/* Divider */}
      <div className="mx-6 border-t border-white/[0.06]" />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-7">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
          Main menu
        </p>

        <div className="space-y-1.5">
          {navigationItems.map((item) => {
            const active = isActive(item.path);

            return (
              <button
                key={item.path}
                onClick={() => navigate(item.path)}
                className={`group relative w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all duration-200 ${
                  active
                    ? "bg-violet-600 text-white shadow-lg shadow-violet-950/30"
                    : "text-slate-400 hover:bg-white/[0.05] hover:text-white"
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-full bg-white" />
                )}

                <span
                  className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg transition ${
                    active
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.04] text-slate-500 group-hover:bg-white/[0.07] group-hover:text-slate-200"
                  }`}
                >
                  {item.icon}
                </span>

                <span className="text-sm font-medium">
                  {item.label}
                </span>

                {active && (
                  <span className="ml-auto text-white/70 text-sm">
                    ›
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Support Card */}
        <div className="mt-8 rounded-2xl border border-white/[0.06] bg-white/[0.035] p-4">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3">
            ?
          </div>

          <p className="text-sm font-semibold text-white">
            Need help?
          </p>

          <p className="text-xs leading-5 text-slate-500 mt-1">
            Manage your fitness journey from one place.
          </p>

          <button className="mt-3 text-xs font-semibold text-violet-400 hover:text-violet-300 transition">
            Contact support →
          </button>
        </div>
      </nav>

      {/* User / Logout */}
      <div className="p-4 border-t border-white/[0.06]">
        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.035]">
          <div className="w-9 h-9 shrink-0 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || "User"}
            </p>

            <p className="text-[11px] text-slate-500 truncate">
              {user?.role || "Member"}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/[0.07] transition-all duration-200"
        >
          <span className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/[0.03]">
            ↪
          </span>

          Sign out
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;