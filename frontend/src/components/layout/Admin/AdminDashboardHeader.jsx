
import { useAuth } from "../../../context/authContext";

function AdminDashboardHeader() {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-slate-200/80">
      <div className="min-h-[78px] px-5 sm:px-7 lg:px-9 flex items-center justify-between">
        <div>
          <p className="hidden sm:block text-[11px] font-semibold uppercase tracking-[0.14em] text-violet-600 mb-1">
            Administration
          </p>

          <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
            Admin Dashboard
          </h2>

          <p className="hidden sm:block text-sm text-slate-500 mt-1">
            Manage your Smart Gym platform from one place.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "Administrator"}
            </p>

            <p className="text-[11px] text-slate-400">
              Admin
            </p>
          </div>

          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 text-white flex items-center justify-center text-sm font-bold">
            {user?.name?.charAt(0).toUpperCase() || "A"}
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminDashboardHeader;

