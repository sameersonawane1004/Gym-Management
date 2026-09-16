import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

function DashboardHeader({ title, description }) {
  const { user } = useAuth();
  const navigate = useNavigate();

  const initial =
    user?.name?.charAt(0).toUpperCase() || "U";

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
      <div className="min-h-[78px] px-5 sm:px-7 lg:px-9 flex items-center justify-between gap-4">
        {/* Page information */}
        <div className="min-w-0">
          <p className="hidden sm:block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600 mb-1">
            Smart Gym
          </p>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 truncate">
            {title}
          </h2>

          {description && (
            <p className="hidden sm:block text-sm text-slate-500 mt-1 truncate max-w-xl">
              {description}
            </p>
          )}
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <button
            type="button"
            className="hidden lg:flex items-center gap-2.5 h-10 px-3.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:bg-white hover:border-slate-300 transition"
          >
            <span className="text-base">⌕</span>

            <span className="text-xs">
              Search
            </span>

            <kbd className="ml-5 px-1.5 py-0.5 rounded-md border border-slate-200 bg-white text-[10px] text-slate-400">
              /
            </kbd>
          </button>

          {/* Notification */}
          <button
            type="button"
            aria-label="Notifications"
            className="relative w-10 h-10 rounded-xl border border-slate-200 bg-white flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition"
          >
            <span className="text-lg">
              ♢
            </span>

            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-violet-500 ring-2 ring-white" />
          </button>

          {/* Divider */}
          <div className="hidden sm:block h-8 w-px bg-slate-200 mx-1" />

          {/* Profile */}
          <button
            type="button"
            onClick={() => navigate("/profile")}
            className="flex items-center gap-2.5 rounded-xl px-1.5 py-1.5 hover:bg-slate-50 transition"
          >
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-800 leading-5">
                {user?.name || "User"}
              </p>

              <p className="text-[11px] text-slate-400 capitalize">
                {user?.role?.toLowerCase() || "member"}
              </p>
            </div>

            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold shadow-md shadow-violet-200">
              {initial}
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;