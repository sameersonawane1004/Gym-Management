import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import { getMyMembership } from "../services/membershipService";

function UserDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembership = async () => {
      try {
        const response = await getMyMembership();
        setMembership(response.data);
      } catch (error) {
        console.error("Failed to fetch membership:", error);
        setMembership(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMembership();
  }, []);

  const getRemainingDays = () => {
    if (!membership?.endDate) return 0;

    const today = new Date();
    const endDate = new Date(membership.endDate);

    const difference = endDate - today;

    return Math.max(
      0,
      Math.ceil(difference / (1000 * 60 * 60 * 24))
    );
  };

  const formatDate = (date) => {
    if (!date) return "-";

    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const remainingDays = getRemainingDays();

  const quickActions = [
    {
      title: "Membership Plans",
      description: "Explore available plans",
      icon: "◇",
      path: "/membership-plans",
    },
    {
      title: "My Membership",
      description: "View your membership",
      icon: "▣",
      path: "/my-membership",
    },
    {
      title: "AI Diet Plan",
      description: "Create your nutrition plan",
      icon: "✦",
      path: "/diet-plan",
    },
    {
      title: "Profile",
      description: "Manage your account",
      icon: "○",
      path: "/profile",
    },
  ];

  return (
    <div className="min-h-screen flex bg-slate-50">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 min-w-0">

        {/* Header */}
        <DashboardHeader
          title="Dashboard"
          description="Your fitness journey at a glance"
        />

        <section className="p-4 sm:p-6 lg:p-8 max-w-[1600px] mx-auto page-enter">

          {/* =========================================
              Welcome Hero
          ========================================= */}
          <div className="relative overflow-hidden rounded-3xl bg-[#111118] p-6 sm:p-8 lg:p-10 shadow-xl shadow-slate-200">

            {/* Background decorations */}
            <div className="absolute -right-20 -top-24 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />
            <div className="absolute right-20 bottom-[-120px] w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />

            <div className="relative flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">

              <div className="max-w-2xl">

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.06] border border-white/[0.08] text-xs font-medium text-violet-300 mb-5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                  Your fitness journey starts here
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
                  Welcome back,
                  <span className="block text-violet-400 mt-1">
                    {user?.name || "Member"}
                  </span>
                </h1>

                <p className="mt-4 text-sm sm:text-base leading-7 text-slate-400 max-w-xl">
                  Stay consistent, keep moving, and make progress toward
                  your fitness goals. Everything you need is right here.
                </p>

                <div className="flex flex-wrap gap-3 mt-7">

                  <button
                    onClick={() => navigate("/membership-plans")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold shadow-lg shadow-violet-950/30 transition-all duration-200 hover:-translate-y-0.5"
                  >
                    Explore Plans
                    <span>→</span>
                  </button>

                  <button
                    onClick={() => navigate("/ai-diet-plan")}
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.1] text-white text-sm font-semibold transition-all duration-200"
                  >
                    <span>✦</span>
                    AI Diet Plan
                  </button>

                </div>
              </div>

              {/* Hero visual */}
              <div className="hidden lg:flex relative w-52 h-52 shrink-0 items-center justify-center">

                <div className="absolute inset-4 rounded-full border border-violet-400/10" />
                <div className="absolute inset-8 rounded-full border border-violet-400/10" />

                <div className="w-32 h-32 rounded-[2rem] bg-gradient-to-br from-violet-500/30 to-indigo-500/10 border border-white/10 backdrop-blur flex items-center justify-center rotate-6">
                  <span className="text-6xl -rotate-6">
                    +
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* =========================================
              Membership Overview
          ========================================= */}
          <div className="mt-7">

            <div className="flex items-end justify-between mb-4">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600">
                  Overview
                </p>

                <h2 className="text-xl font-bold text-slate-900 mt-1">
                  Membership status
                </h2>
              </div>

              <button
                onClick={() => navigate("/my-membership")}
                className="hidden sm:inline-flex items-center gap-1 text-sm font-semibold text-violet-600 hover:text-violet-700"
              >
                View details
                <span>→</span>
              </button>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

              {/* Status */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover">

                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Status
                    </p>

                    <div className="mt-3">

                      {loading ? (
                        <div className="w-24 h-7 rounded-lg skeleton" />
                      ) : (
                        <div className="flex items-center gap-2">

                          <span
                            className={`w-2.5 h-2.5 rounded-full ${
                              membership
                                ? "bg-emerald-500"
                                : "bg-slate-300"
                            }`}
                          />

                          <span
                            className={`text-xl font-bold ${
                              membership
                                ? "text-emerald-600"
                                : "text-slate-500"
                            }`}
                          >
                            {membership?.status || "Inactive"}
                          </span>

                        </div>
                      )}

                    </div>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                    ✓
                  </div>

                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Membership account status
                </p>

              </div>

              {/* Plan */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover">

                <div className="flex items-start justify-between">

                  <div className="min-w-0">

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Current plan
                    </p>

                    {loading ? (
                      <div className="w-28 h-7 rounded-lg skeleton mt-3" />
                    ) : (
                      <h3 className="text-xl font-bold text-slate-900 mt-3 truncate">
                        {membership?.plan?.name || "No Plan"}
                      </h3>
                    )}

                  </div>

                  <div className="w-10 h-10 shrink-0 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg">
                    ◇
                  </div>

                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Your active membership plan
                </p>

              </div>

              {/* Valid Until */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Valid until
                    </p>

                    {loading ? (
                      <div className="w-32 h-7 rounded-lg skeleton mt-3" />
                    ) : (
                      <h3 className="text-xl font-bold text-slate-900 mt-3">
                        {membership
                          ? formatDate(membership.endDate)
                          : "-"}
                      </h3>
                    )}

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
                    □
                  </div>

                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Membership expiry date
                </p>

              </div>

              {/* Remaining */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover">

                <div className="flex items-start justify-between">

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Remaining
                    </p>

                    {loading ? (
                      <div className="w-24 h-7 rounded-lg skeleton mt-3" />
                    ) : (
                      <h3 className="text-xl font-bold text-slate-900 mt-3">
                        {membership
                          ? `${remainingDays} days`
                          : "-"}
                      </h3>
                    )}

                  </div>

                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                    ◷
                  </div>

                </div>

                <p className="text-xs text-slate-400 mt-4">
                  Time remaining on your plan
                </p>

              </div>

            </div>
          </div>

          {/* =========================================
              Quick Actions
          ========================================= */}
          <div className="mt-8">

            <div className="mb-4">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600">
                Shortcuts
              </p>

              <h2 className="text-xl font-bold text-slate-900 mt-1">
                Quick actions
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">

              {quickActions.map((action) => (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="group text-left bg-white rounded-2xl border border-slate-200/80 p-5 soft-shadow card-hover hover:border-violet-200"
                >

                  <div className="flex items-center justify-between">

                    <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-xl font-semibold group-hover:bg-violet-600 group-hover:text-white transition-colors duration-200">
                      {action.icon}
                    </div>

                    <span className="text-slate-300 group-hover:text-violet-500 transition-colors text-lg">
                      →
                    </span>

                  </div>

                  <h3 className="mt-5 text-sm font-bold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {action.description}
                  </p>

                </button>
              ))}

            </div>
          </div>

          {/* =========================================
              Bottom Information Section
          ========================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-8">

            {/* Progress */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 soft-shadow">

              <div className="flex items-start justify-between">

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.14em] text-violet-600">
                    Your journey
                  </p>

                  <h2 className="text-xl font-bold text-slate-900 mt-1">
                    Stay consistent
                  </h2>
                </div>

                <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  ✦
                </div>

              </div>

              <p className="text-sm leading-6 text-slate-500 mt-4 max-w-2xl">
                Small improvements every day create lasting results.
                Keep your membership active, follow your nutrition plan,
                and stay consistent with your workouts.
              </p>

              <div className="mt-6">

                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-slate-600">
                    Membership progress
                  </span>

                  <span className="text-slate-400">
                    {membership ? "Active" : "Get started"}
                  </span>
                </div>

                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      membership
                        ? "w-[72%] bg-gradient-to-r from-violet-500 to-indigo-500"
                        : "w-0"
                    }`}
                  />

                </div>

              </div>

            </div>

            {/* Motivation */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg shadow-violet-200">

              <div className="absolute -right-12 -top-12 w-32 h-32 rounded-full bg-white/10" />
              <div className="absolute -right-5 -bottom-16 w-40 h-40 rounded-full bg-white/5" />

              <div className="relative">

                <div className="w-11 h-11 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-xl">
                  ↑
                </div>

                <h2 className="text-xl font-bold mt-6">
                  Keep moving forward.
                </h2>

                <p className="text-sm leading-6 text-violet-100 mt-2">
                  Your future self will thank you for the effort you put
                  in today.
                </p>

                <button
                  onClick={() => navigate("/my-membership")}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-violet-100 transition"
                >
                  View membership
                  <span>→</span>
                </button>

              </div>

            </div>

          </div>

          {/* Mobile membership link */}
          <div className="sm:hidden mt-5 text-center">
            <button
              onClick={() => navigate("/my-membership")}
              className="text-sm font-semibold text-violet-600"
            >
              View membership details →
            </button>
          </div>

        </section>

      </main>
    </div>
  );
}

export default UserDashboard;