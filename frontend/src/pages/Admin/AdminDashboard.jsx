import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { useEffect,useState } from "react";
import { toast } from 'react-hot-toast';
import { getAdminDashboardStats } from "../../services/admin/adminService";

function AdminDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const [stats, setStats] = useState({
  totalMembers: 0,
  totalMemberships: 0,
  totalPlans: 0,
  totalPayments: 0,
});

const [loading, setLoading] = useState(true);

  

  useEffect(() => {
  const fetchStats = async () => {
    try {
      const response = await getAdminDashboardStats();

      if (response.success) {
        setStats(response.data);
      }
    } catch (error) {
      console.error("Dashboard stats error:", error);
      toast.error(error.message || "Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);

const statCards = [
    {
      title: "Total Members",
      value: stats.totalMembers,
      icon: "◉",
      description: "Registered users",
    },
    {
      title: "Total Memberships",
      value: stats.totalMemberships,
      icon: "▣",
      description: "Active memberships",
    },
    {
      title: "Total Plans",
      value: stats.totalPlans,
      icon: "◇",
      description: "Available plans",
    },
    {
      title: "Total Payments",
      value: stats.totalPayments,
      icon: "₹",
      description: "Payment records",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">

      {/* Sidebar */}
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

            <button
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
            >
              <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                ◉
              </span>

              <span className="text-sm font-medium">
                Members
              </span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
            >
              <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                ◇
              </span>

              <span className="text-sm font-medium">
                Plans
              </span>
            </button>

            <button
              className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-slate-400 hover:bg-white/[0.05] hover:text-white transition"
            >
              <span className="w-9 h-9 rounded-lg bg-white/[0.04] flex items-center justify-center">
                ▣
              </span>

              <span className="text-sm font-medium">
                Memberships
              </span>
            </button>

            <button
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

      {/* Main content */}
      <main className="flex-1 min-w-0">

        {/* Header */}
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

        {/* Dashboard */}
        <div className="p-5 sm:p-7 lg:p-9 page-enter">

          {/* Welcome */}
          <section className="rounded-3xl bg-[#111118] text-white p-6 sm:p-8 relative overflow-hidden">

            <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />

            <div className="relative">

              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-violet-400">
                Overview
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold mt-2">
                Welcome, {user?.name || "Admin"}
              </h1>

              <p className="text-sm text-slate-400 mt-2 max-w-xl">
                Monitor members, memberships, plans and payments
                from your administration dashboard.
              </p>

            </div>

          </section>

          {/* Stats */}
          <section className="mt-7">

            <div className="flex items-center justify-between mb-4">

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Platform Overview
                </h2>

                <p className="text-sm text-slate-500 mt-1">
                  Current system statistics
                </p>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {statCards.map((stat) => (

                <div
                  key={stat.title}
                  className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition"
                >

                  <div className="flex items-start justify-between">

                    <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg font-bold">
                      {stat.icon}
                    </div>

                    <span className="text-xs font-medium text-slate-400">
                      Today
                    </span>

                  </div>

                  <p className="text-3xl font-bold text-slate-900 mt-5">
                    {loading ? "...": stat.value}
                  </p>

                  <p className="text-sm font-semibold text-slate-700 mt-1">
                    {stat.title}
                  </p>

                  <p className="text-xs text-slate-400 mt-1">
                    {stat.description}
                  </p>

                </div>

              ))}

            </div>

          </section>

          {/* Management shortcuts */}
          <section className="mt-8">

            <h2 className="text-lg font-bold text-slate-900">
              Quick Management
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Access the main administration areas.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">

              {[
                ["Members", "Manage registered members", "◉"],
                ["Plans", "Create and manage plans", "◇"],
                ["Memberships", "View member memberships", "▣"],
                ["Payments", "Monitor payment records", "₹"],
              ].map(([title, description, icon]) => (

                <button
                  key={title}
                  className="text-left bg-white border border-slate-200 rounded-2xl p-5 hover:border-violet-300 hover:shadow-md transition"
                >

                  <div className="w-10 h-10 rounded-xl bg-slate-100 text-violet-600 flex items-center justify-center font-bold">
                    {icon}
                  </div>

                  <h3 className="font-semibold text-slate-900 mt-4">
                    {title}
                  </h3>

                  <p className="text-xs text-slate-500 mt-1">
                    {description}
                  </p>

                  <span className="inline-block mt-4 text-xs font-semibold text-violet-600">
                    Manage →
                  </span>

                </button>

              ))}

            </div>

          </section>

        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;