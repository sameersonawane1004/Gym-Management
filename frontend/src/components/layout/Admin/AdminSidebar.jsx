
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/authContext";
import { toast } from "react-hot-toast";

function AdminSidebar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success("Logout successful");
    navigate("/");
  };

  return (
    <aside className="hidden md:flex w-[270px] min-h-screen flex-col bg-[#111118] text-white border-r border-white/[0.06]">

      {/* Logo */}
      <div className="px-6 pt-7 pb-6">
        <button
          onClick={() => navigate("/admin/dashboard")}
          className="flex items-center gap-3 text-left"
        >
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-900/30">
            <span className="text-xl font-black">S</span>
          </div>

          <div>
            <h1 className="text-[17px] font-bold">
              Smart Gym
            </h1>

            <p className="text-[11px] text-slate-500 mt-0.5 tracking-wide">
              ADMIN PORTAL
            </p>
          </div>
        </button>
      </div>

      <div className="mx-6 border-t border-white/[0.06]" />

      {/* Navigation */}
      <nav className="flex-1 px-4 py-7">
        <p className="px-3 mb-3 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-600">
          Management
        </p>

        <div className="space-y-1.5">

          {/* Dashboard */}
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl bg-violet-600 text-white shadow-lg shadow-violet-950/30"
          >
            <span className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
              ⌂
            </span>

            <span className="text-sm font-medium">
              Dashboard
            </span>

            <span className="ml-auto text-white/70">
              ›
            </span>
          </button>

          {/* Members */}
          <button
            onClick={() => navigate("/admin/members")}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
          >
            <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
              ◉
            </span>

            <span className="text-sm font-medium">
              Members
            </span>
          </button>

          {/* Plans */}
          <button
            onClick={() => navigate("/admin/plans")}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
          >
            <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
              ◇
            </span>

            <span className="text-sm font-medium">
              Plans
            </span>
          </button>

          {/* Memberships */}
          <button
            onClick={() => navigate("/admin/memberships")}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
          >
            <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
              ▣
            </span>

            <span className="text-sm font-medium">
              Memberships
            </span>
          </button>

          {/* Payments */}
          <button
            onClick={() => navigate("/admin/payments")}
            className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
          >
            <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
              ₹
            </span>

            <span className="text-sm font-medium">
              Payments
            </span>
          </button>

        </div>
      </nav>

      {/* Admin profile */}
      <div className="p-4 border-t border-white/[0.06]">

        <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-white/[0.035]">

          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-white truncate">
              {user?.name || "Administrator"}
            </p>

            <p className="text-[11px] text-slate-500">
              Administrator
            </p>
          </div>

        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="mt-2 w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/[0.07] transition"
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

export default AdminSidebar;

