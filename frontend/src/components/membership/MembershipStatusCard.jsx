const MembershipStatusCard = ({ membership }) => {
  const plan = membership?.plan;

  const startDate = membership?.startDate
    ? new Date(membership.startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  const endDate = membership?.endDate
    ? new Date(membership.endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  const calculateDaysRemaining = () => {
    if (!membership?.endDate) return 0;

    const today = new Date();
    const end = new Date(membership.endDate);

    const difference = end.getTime() - today.getTime();

    return Math.max(
      0,
      Math.ceil(difference / (1000 * 60 * 60 * 24))
    );
  };

  const daysRemaining = calculateDaysRemaining();

  const isActive =
    membership?.status === "ACTIVE" && daysRemaining > 0;

  const duration =
    plan?.durationInMonths ||
    plan?.duration ||
    "-";

  return (
    <div className="space-y-6">
      {/* Main Membership Card */}
      <div
        className={`relative overflow-hidden rounded-3xl border bg-white shadow-sm ${
          isActive
            ? "border-emerald-200"
            : "border-red-200"
        }`}
      >
        {/* Top accent */}
        <div
          className={`h-1.5 w-full ${
            isActive
              ? "bg-gradient-to-r from-emerald-400 via-emerald-500 to-teal-500"
              : "bg-gradient-to-r from-red-400 to-rose-500"
          }`}
        />

        {/* Header */}
        <div
          className={`p-6 sm:p-8 ${
            isActive
              ? "bg-gradient-to-br from-emerald-50 via-white to-teal-50"
              : "bg-gradient-to-br from-red-50 via-white to-rose-50"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            {/* Plan */}
            <div className="flex items-center gap-4">
              <div
                className={`w-16 h-16 shrink-0 rounded-2xl flex items-center justify-center text-2xl border ${
                  isActive
                    ? "bg-white border-emerald-100 shadow-sm"
                    : "bg-white border-red-100 shadow-sm"
                }`}
              >
                👑
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    {plan?.name || "Membership Plan"}
                  </h2>

                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                      isActive
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isActive
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      }`}
                    />
                    {isActive ? "Active" : "Expired"}
                  </span>
                </div>

                <p className="text-sm text-slate-500 mt-1.5">
                  {duration !== "-"
                    ? `${duration} ${
                        Number(duration) === 1
                          ? "Month"
                          : "Months"
                      } Plan`
                    : "Membership Plan"}
                </p>
              </div>
            </div>

            {/* Price */}
            <div className="sm:text-right">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Membership price
              </p>

              <p className="text-3xl font-extrabold tracking-tight text-slate-900 mt-1">
                ₹{plan?.price || 0}
              </p>
            </div>
          </div>
        </div>

        {/* Membership Details */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 border-t border-slate-100">
          {/* Start Date */}
          <div className="p-5 sm:p-6 border-b sm:border-r xl:border-b-0 border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center text-sm">
                📅
              </span>
              Start Date
            </div>

            <p className="mt-4 text-base font-bold text-slate-900">
              {startDate}
            </p>
          </div>

          {/* End Date */}
          <div className="p-5 sm:p-6 border-b xl:border-b-0 xl:border-r border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center text-sm">
                📅
              </span>
              End Date
            </div>

            <p className="mt-4 text-base font-bold text-slate-900">
              {endDate}
            </p>
          </div>

          {/* Days Remaining */}
          <div className="p-5 sm:p-6 border-b sm:border-r xl:border-b-0 border-slate-100">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  daysRemaining > 0
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                ◷
              </span>
              Days Remaining
            </div>

            <p
              className={`mt-4 text-base font-bold ${
                daysRemaining > 0
                  ? "text-slate-900"
                  : "text-red-600"
              }`}
            >
              {daysRemaining} Days
            </p>
          </div>

          {/* Status */}
          <div className="p-5 sm:p-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <span
                className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                  isActive
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-600"
                }`}
              >
                ●
              </span>
              Status
            </div>

            <div className="flex items-center gap-2 mt-4">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  isActive
                    ? "bg-emerald-500"
                    : "bg-red-500"
                }`}
              />

              <p
                className={`font-bold ${
                  isActive
                    ? "text-emerald-600"
                    : "text-red-600"
                }`}
              >
                {isActive ? "Active" : "Expired"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Included Benefits */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="w-11 h-11 shrink-0 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg">
            ✦
          </div>

          <div>
            <h3 className="text-base font-bold text-slate-900">
              Membership Benefits
            </h3>

            <p className="text-sm text-slate-500 mt-1">
              Your membership includes access to the following facilities.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
          {[
            "Gym Access",
            "Basic Equipment",
            "Locker Room",
            "Group Classes",
          ].map((benefit) => (
            <div
              key={benefit}
              className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 border border-slate-100"
            >
              <span className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center text-xs font-bold">
                ✓
              </span>

              <span className="text-sm font-medium text-slate-700">
                {benefit}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Important Information */}
      <div className="rounded-3xl border border-violet-100 bg-violet-50/60 p-6 sm:p-7">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 shrink-0 rounded-xl bg-white text-violet-600 flex items-center justify-center shadow-sm">
            !
          </div>

          <div>
            <h3 className="font-bold text-violet-900">
              Important Information
            </h3>

            <ul className="mt-3 space-y-2.5 text-sm text-slate-600">
              <li className="flex gap-2.5">
                <span className="text-violet-500">•</span>
                Please carry your ID card while visiting the gym.
              </li>

              <li className="flex gap-2.5">
                <span className="text-violet-500">•</span>
                Membership is non-transferable.
              </li>

              <li className="flex gap-2.5">
                <span className="text-violet-500">•</span>
                Contact support for any membership related queries.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MembershipStatusCard;