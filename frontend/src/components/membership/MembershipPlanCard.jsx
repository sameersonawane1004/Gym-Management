const MembershipPlanCard = ({
  plan,
  popular = false,
  onChoosePlan,
}) => {
  return (
    <div
      className={`relative h-full flex flex-col bg-white rounded-3xl border overflow-hidden transition-all duration-300 ${
        popular
          ? "border-violet-300 shadow-lg shadow-violet-100/60"
          : "border-slate-200 shadow-sm"
      } hover:-translate-y-1 hover:shadow-xl`}
    >
      {/* Popular badge */}
      {popular && (
        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
          <div className="px-5 py-1.5 rounded-b-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-[11px] font-bold tracking-wide shadow-md">
            MOST POPULAR
          </div>
        </div>
      )}

      {/* Top accent */}
      <div
        className={`h-1.5 w-full ${
          popular
            ? "bg-gradient-to-r from-violet-500 to-indigo-600"
            : "bg-slate-100"
        }`}
      />

      <div className="flex flex-col flex-1 p-6 sm:p-7">
        {/* Icon + plan type */}
        <div className="flex items-center justify-between">
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
              popular
                ? "bg-violet-50 text-violet-600"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            <span className="text-xl">🏋️</span>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            Membership
          </span>
        </div>

        {/* Plan name */}
        <div className="mt-6">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            {plan.name}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Everything you need for your fitness journey.
          </p>
        </div>

        {/* Price */}
        <div className="mt-6 pb-6 border-b border-slate-100">
          <div className="flex items-end gap-1">
            <span className="text-sm font-semibold text-slate-500 mb-1">
              ₹
            </span>

            <span className="text-4xl font-extrabold tracking-tight text-slate-900">
              {plan.price}
            </span>
          </div>

          <p className="mt-1 text-xs text-slate-400">
            Valid for {plan.durationInMonths}{" "}
            {plan.durationInMonths === 1 ? "month" : "months"}
          </p>
        </div>

        {/* Features */}
        <div className="mt-6 flex-1">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400 mb-4">
            What's included
          </p>

          <div className="space-y-3.5">
            {[
              "Gym Access",
              "Basic Equipment",
              "Locker Room",
              "Group Classes",
            ].map((feature) => (
              <div
                key={feature}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <span
                  className={`w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-xs font-bold ${
                    popular
                      ? "bg-violet-50 text-violet-600"
                      : "bg-emerald-50 text-emerald-600"
                  }`}
                >
                  ✓
                </span>

                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Choose plan */}
        <button
          type="button"
          onClick={() => onChoosePlan(plan)}
          className={`w-full mt-8 py-3.5 rounded-xl text-sm font-bold text-white transition-all duration-200 shadow-sm ${
            popular
              ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700 hover:shadow-lg hover:shadow-violet-200"
              : "bg-slate-900 hover:bg-violet-600 hover:shadow-lg"
          }`}
        >
          Choose Plan
          <span className="ml-2">→</span>
        </button>

        <p className="text-center text-[11px] text-slate-400 mt-3">
          Secure payment • Instant activation
        </p>
      </div>
    </div>
  );
};

export default MembershipPlanCard;