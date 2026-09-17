import { useAuth } from "../../context/authContext";
import { useEffect,useState } from "react";
import { toast } from 'react-hot-toast';
import { getAdminDashboardStats } from "../../services/admin/adminService";
import AdminSidebar from "../../components/layout/Admin/AdminSidebar";
import AdminDashboardHeader from "../../components/layout/Admin/AdminDashboardHeader";

function AdminDashboard() {
   
  const { user } = useAuth();
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
       <AdminSidebar/>

      {/* Main content */}
      <main className="flex-1 min-w-0">

        {/* Header */}
         <AdminDashboardHeader/>

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