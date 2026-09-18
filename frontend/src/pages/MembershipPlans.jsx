import { useEffect, useState } from "react";
import { getMembershipPlans } from "../services/membershipPlanService";
import MembershipPlanCard from "../components/membership/MembershipPlanCard";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import { useNavigate } from "react-router-dom";
import { getMyMembership } from "../services/membershipService";
import toast from "react-hot-toast";

const MembershipPlans = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChoosePlan = async (plan) => {
  try {
    const response = await getMyMembership();

    if (response.success && response.data) {
      toast.error("You already have an active membership.");
      return;
    }

    navigate("/payment", {
      state: {
        plan,
      },
    });
  } catch (error) {
    // 404 means the user does not have a membership yet.
    // In that case, allow them to continue to payment.
    if (error.cause?.response?.status === 404) {
      navigate("/payment", {
        state: {
          plan,
        },
      });
      return;
    }

    toast.error(error.message || "Unable to check membership status");
  }
};

  const fetchMembershipPlans = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getMembershipPlans();

      if (response.success) {
        setPlans(response.data.filter((plan) => plan.isActive));
      } else {
        setError(response.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Failed to load membership plans";

      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMembershipPlans = async () => {
      await fetchMembershipPlans();
    };

    loadMembershipPlans();
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex overflow-hidden">
      <Sidebar />

      <main className="flex-1 min-w-0 md:ml-[270px] h-screen overflow-y-auto">
        <DashboardHeader
          title="Membership Plans"
          description="Choose the right plan for your fitness journey"
        />

        <section className="page-enter px-5 py-7 sm:px-7 lg:px-9">
          {/* Intro */}
          <div className="mb-8">
            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                Membership
              </span>

              <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                Find a plan that fits
                <span className="text-violet-600"> your goals.</span>
              </h1>

              <p className="mt-3 text-sm sm:text-base leading-6 text-slate-500 max-w-2xl">
                Get access to the right membership and take your fitness
                journey to the next level.
              </p>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm"
                >
                  <div className="skeleton h-12 w-12 rounded-2xl" />
                  <div className="skeleton h-5 w-32 rounded-lg mt-6" />
                  <div className="skeleton h-9 w-28 rounded-lg mt-4" />
                  <div className="skeleton h-4 w-full rounded-lg mt-6" />
                  <div className="skeleton h-4 w-4/5 rounded-lg mt-2" />
                  <div className="skeleton h-12 w-full rounded-xl mt-8" />
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="max-w-2xl mx-auto bg-white border border-red-100 rounded-3xl p-8 text-center shadow-sm">
              <div className="mx-auto w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center text-xl font-bold">
                !
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-900">
                Unable to load membership plans
              </h3>

              <p className="mt-2 text-sm text-slate-500">{error}</p>

              <button
                onClick={fetchMembershipPlans}
                className="mt-6 px-5 py-2.5 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition"
              >
                Try again
              </button>
            </div>
          )}

          {/* No Plans */}
          {!loading && !error && plans.length === 0 && (
            <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-3xl p-10 text-center shadow-sm">
              <div className="mx-auto w-16 h-16 rounded-2xl bg-violet-50 text-violet-600 flex items-center justify-center text-2xl">
                ◇
              </div>

              <h3 className="mt-5 text-xl font-bold text-slate-900">
                No Membership Plans Available
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                There are currently no active plans. Please check again later.
              </p>
            </div>
          )}

          {/* Plans */}
          {!loading && !error && plans.length > 0 && (
            <>
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Available plans
                  </h2>
                  <p className="text-sm text-slate-500 mt-1">
                    Select the membership that works best for you.
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-medium text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  {plans.length} active{" "}
                  {plans.length === 1 ? "plan" : "plans"}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-stretch">
                {plans.map((plan, index) => (
                  <div
                    key={plan.id}
                    className="card-hover h-full"
                  >
                    <MembershipPlanCard
                      plan={plan}
                      popular={index === 1}
                      onChoosePlan={handleChoosePlan}
                    />
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Bottom reassurance */}
          {!loading && !error && plans.length > 0 && (
            <div className="mt-10 rounded-2xl border border-slate-200 bg-white px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                  ✓
                </div>

                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    Simple and secure membership
                  </p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Complete your purchase securely through the payment page.
                  </p>
                </div>
              </div>

              <span className="text-xs font-semibold text-slate-400">
                Smart Gym
              </span>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default MembershipPlans;