import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import {
  createPaymentOrder,
  verifyPayment,
  getMyPayments,
} from "../services/paymentService";
import { getToken } from "./../utils/token";

const PaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [payments, setPayments] = useState([]);
  const [paymentsLoading, setPaymentsLoading] = useState(true);

  const plan = location.state?.plan;

  useEffect(() => {
    const fetchPaymentHistory = async () => {
      try {
        const token = getToken();
        const response = await getMyPayments(token);

        if (response.success) {
          setPayments(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch payment history:", error);
      } finally {
        setPaymentsLoading(false);
      }
    };

    fetchPaymentHistory();
  }, []);

  const handlePayment = async () => {
    try {
      setLoading(true);
      setError("");

      const token = getToken();

      const orderResponse = await createPaymentOrder(plan.id, token);
      const { orderId, amount, currency } = orderResponse.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount,
        currency,
        name: "Smart Gym",
        description: `${plan.name} Membership`,
        order_id: orderId,

        handler: async (response) => {
          try {
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              planId: plan.id,
            };

            await verifyPayment(verificationData, token);

            navigate("/my-membership");
          } catch (error) {
            setError(error.message || "Payment verification failed.");
          }
        },

        prefill: {
          name: user?.name || "",
          email: user?.email || "",
        },

        theme: {
          color: "#7c3aed",
        },

        modal: {
          ondismiss: () => {
            setLoading(false);
          },
        },
      };

      if (!window.Razorpay) {
        throw new Error(
          "Razorpay is not loaded. Please refresh the page and try again."
        );
      }

      const razorpay = new window.Razorpay(options);

      razorpay.on("payment.failed", (response) => {
        setError(
          response.error?.description ||
            "Payment failed. Please try again."
        );
      });

      razorpay.open();
    } catch (error) {
      setError(error.message || "Unable to start payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!plan) {
    return (
      <div className="app-page min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <div className="glass-card soft-shadow rounded-3xl p-8 text-center">
            <div className="mx-auto mb-5 w-16 h-16 rounded-2xl bg-violet-100 text-violet-600 flex items-center justify-center text-3xl">
              ₹
            </div>

            <h1 className="text-2xl font-bold text-slate-900">
              No plan selected
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Please select a membership plan before proceeding to payment.
            </p>

            <button
              type="button"
              onClick={() => navigate("/membership-plans")}
              className="mt-6 w-full rounded-xl bg-violet-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700"
            >
              View Membership Plans
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-page min-h-screen p-4 sm:p-6 lg:p-10">
      <div className="mx-auto max-w-6xl">
        {/* Top navigation */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <button
            type="button"
            onClick={() => navigate("/membership-plans")}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-600 shadow-sm transition hover:border-slate-300 hover:text-slate-900"
          >
            <span className="text-lg">←</span>
            Back to Plans
          </button>

          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            Secure Checkout
          </div>
        </div>

        {/* Heading */}
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-violet-600">
            Membership checkout
          </p>

          <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
            Complete your payment
          </h1>

          <p className="mt-2 max-w-2xl text-sm sm:text-base leading-6 text-slate-500">
            Review your selected membership and complete the secure Razorpay
            payment to activate your plan.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Selected plan */}
          <section className="overflow-hidden rounded-3xl bg-[#111118] text-white shadow-xl shadow-slate-200/70">
            <div className="p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/20 bg-violet-500/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-violet-300">
                    Selected plan
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
                    {plan.name}
                  </h2>

                  <p className="mt-2 text-sm text-slate-400">
                    Membership plan
                  </p>
                </div>

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-violet-600 text-xl shadow-lg shadow-violet-950/40">
                  ◇
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/[0.07] bg-white/[0.04] p-5">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">
                  Total amount
                </p>

                <div className="mt-2 flex items-end gap-2">
                  <span className="text-4xl sm:text-5xl font-bold tracking-tight">
                    ₹{plan.price}
                  </span>

                  <span className="mb-1.5 text-sm text-slate-400">
                    / membership
                  </span>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Duration
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    {plan.durationInMonths || plan.duration} month(s)
                  </p>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.035] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500">
                    Payment
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white">
                    Razorpay
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                {[
                  "Secure online payment",
                  "Membership activation after verification",
                  "Payment receipt stored in your account",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-sm text-slate-300"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-xs text-emerald-400">
                      ✓
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Payment action */}
          <section className="glass-card soft-shadow rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-100 text-violet-600 text-xl">
                ₹
              </div>

              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Payment details
                </h2>
                <p className="text-xs text-slate-500">
                  Ready to activate your membership?
                </p>
              </div>
            </div>

            <div className="mt-7 rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-slate-800">
                    {plan.name}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {plan.durationInMonths || plan.duration} month(s)
                  </p>
                </div>

                <p className="text-xl font-bold text-slate-900">
                  ₹{plan.price}
                </p>
              </div>

              <div className="my-5 border-t border-slate-200" />

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-500">Amount payable</span>
                <span className="text-lg font-bold text-violet-600">
                  ₹{plan.price}
                </span>
              </div>
            </div>

            {error && (
              <div className="mt-5 flex gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
                <span className="mt-0.5 text-red-500">!</span>

                <div>
                  <p className="text-sm font-semibold text-red-700">
                    Payment error
                  </p>
                  <p className="mt-1 text-xs leading-5 text-red-600">
                    {error}
                  </p>
                </div>
              </div>
            )}

            <button
              type="button"
              onClick={handlePayment}
              disabled={loading}
              className="mt-6 w-full rounded-2xl bg-violet-600 px-5 py-4 text-sm font-bold text-white shadow-lg shadow-violet-200 transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Processing payment...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  Pay ₹{plan.price} securely
                  <span className="text-lg">→</span>
                </span>
              )}
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span>🔒</span>
              Secure payment powered by Razorpay
            </div>

            <div className="mt-6 rounded-2xl border border-violet-100 bg-violet-50 p-4">
              <p className="text-xs font-semibold text-violet-800">
                Important
              </p>
              <p className="mt-1 text-xs leading-5 text-violet-700">
                Your membership will be activated only after successful payment
                verification.
              </p>
            </div>
          </section>
        </div>

        {/* Payment history */}
        <section className="mt-8">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-600">
                Transactions
              </p>

              <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
                Payment history
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Your previous membership payments.
              </p>
            </div>

            {!paymentsLoading && payments.length > 0 && (
              <span className="hidden sm:inline-flex rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-500">
                {payments.length} transaction
                {payments.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          <div className="glass-card soft-shadow rounded-3xl overflow-hidden">
            {paymentsLoading ? (
              <div className="p-6 space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between gap-4 rounded-2xl border border-slate-100 p-4"
                  >
                    <div className="flex items-center gap-3">
                      <div className="skeleton h-11 w-11 rounded-xl" />
                      <div>
                        <div className="skeleton h-4 w-32 rounded-md" />
                        <div className="skeleton mt-2 h-3 w-20 rounded-md" />
                      </div>
                    </div>

                    <div className="skeleton h-5 w-20 rounded-md" />
                  </div>
                ))}
              </div>
            ) : payments.length === 0 ? (
              <div className="p-8 sm:p-12 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-xl text-slate-400">
                  ₹
                </div>

                <h3 className="mt-4 text-base font-bold text-slate-800">
                  No payment history yet
                </h3>

                <p className="mx-auto mt-1 max-w-sm text-sm leading-6 text-slate-500">
                  Your successful membership payments will appear here.
                </p>
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {payments.map((payment) => {
                  const status = payment.status?.toUpperCase();
                  const isSuccess =
                    status === "SUCCESS" || status === "PAID";

                  return (
                    <div
                      key={payment.id}
                      className="p-5 sm:p-6 transition hover:bg-slate-50/70"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-4 min-w-0">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                              isSuccess
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {isSuccess ? "✓" : "₹"}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold text-slate-800">
                              {payment.membership?.plan?.name ||
                                "Membership"}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {new Date(
                                payment.paymentDate
                              ).toLocaleDateString("en-IN", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between gap-5 sm:justify-end">
                          <span
                            className={`rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide ${
                              isSuccess
                                ? "bg-emerald-50 text-emerald-600"
                                : "bg-amber-50 text-amber-600"
                            }`}
                          >
                            {payment.status}
                          </span>

                          <span className="min-w-[75px] text-right text-base font-bold text-slate-900">
                            ₹{payment.amount}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </section>

        {/* Bottom note */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/60 px-5 py-4 text-xs text-slate-500">
          <span>Smart Gym • Membership payment</span>
          <span>Your payment information is handled securely.</span>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;