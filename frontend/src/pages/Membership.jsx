import { useEffect, useState } from "react";
import { getMyMembership } from "../services/membershipService";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import MembershipStatusCard from "../components/membership/MembershipStatusCard";

const Membership = () => {
  const [membership, setMembership] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMyMembership = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMyMembership();

      if (response.success) {
        setMembership(response.data);
      } else {
        setError(response.message || "Unable to load membership");
      }
    } catch (error) {
      setError(
        error.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  const timer = setTimeout(() => {
    fetchMyMembership();
  }, 0);

  return () => clearTimeout(timer);
}, []);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <DashboardHeader
          title="My Membership"
          description="View your current membership and plan details"
        />

        <main className="p-5 sm:p-7 lg:p-9 page-enter">
          {/* Intro */}
          <section className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-[11px] font-bold uppercase tracking-wider">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                  Membership
                </div>

                <h1 className="mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                  Your fitness membership
                </h1>

                <p className="mt-2 text-sm sm:text-base text-slate-500 max-w-2xl">
                  Keep track of your active plan, membership status and
                  important membership details.
                </p>
              </div>

              {!loading && membership && (
                <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-50 border border-emerald-100">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-emerald-700">
                    Membership Active
                  </span>
                </div>
              )}
            </div>
          </section>

          {/* Loading */}
          {loading && (
            <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
              <div className="flex items-center gap-5">
                <div className="skeleton w-16 h-16 rounded-2xl" />

                <div className="flex-1">
                  <div className="skeleton h-5 w-40 rounded-lg" />
                  <div className="skeleton h-3 w-64 rounded-lg mt-3" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="skeleton h-24 rounded-2xl" />
                <div className="skeleton h-24 rounded-2xl" />
                <div className="skeleton h-24 rounded-2xl" />
              </div>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="bg-white border border-red-200 rounded-3xl p-7 sm:p-9 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-14 h-14 shrink-0 rounded-2xl bg-red-50 border border-red-100 flex items-center justify-center text-xl">
                  !
                </div>

                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">
                    Unable to load membership
                  </h3>

                  <p className="text-sm text-slate-500 mt-1">
                    {error}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={fetchMyMembership}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-violet-600 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}

          {/* No Membership */}
          {!loading && !error && !membership && (
            <div className="bg-white border border-slate-200 rounded-3xl p-10 sm:p-14 text-center shadow-sm">
              <div className="mx-auto w-20 h-20 rounded-3xl bg-violet-50 flex items-center justify-center">
                <span className="text-3xl">🏋️</span>
              </div>

              <h2 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">
                No Active Membership
              </h2>

              <p className="max-w-md mx-auto mt-2 text-sm text-slate-500 leading-6">
                You don't have an active membership yet. Choose a plan to
                start your fitness journey.
              </p>
            </div>
          )}

          {/* Membership */}
          {!loading && !error && membership && (
            <section>
              <div className="mb-4">
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">
                  Current plan
                </p>
              </div>

              <MembershipStatusCard membership={membership} />
            </section>
          )}
        </main>
      </div>
    </div>
  );
};

export default Membership;