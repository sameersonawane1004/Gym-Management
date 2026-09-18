
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/layout/Admin/AdminSidebar";
import AdminDashboardHeader from "../../components/layout/Admin/AdminDashboardHeader";

import { getAllPayments } from "../../services/admin/adminPaymentService";


function AdminPayments() {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPayments = async () => {
        try {
            setLoading(true);

            const response = await getAllPayments();

            setPayments(response.data || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPayments();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    const formatDate = (date) => {
        return new Date(date).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric"
        });
    };

    const successfulPayments = payments.filter(
        (payment) => payment.status === "SUCCESS"
    ).length;

    const pendingPayments = payments.filter(
        (payment) => payment.status === "PENDING"
    ).length;

    const totalRevenue = payments
        .filter((payment) => payment.status === "SUCCESS")
        .reduce(
            (total, payment) => total + Number(payment.amount || 0),
            0
        );

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">

            <AdminSidebar />

            <main className="flex-1 min-w-0 md:ml-[270px] h-screen overflow-y-auto">

                <AdminDashboardHeader
                    title="Payment Management"
                    description="View payment transactions made by gym members."
                />

                <div className="p-5 sm:p-7 lg:p-9 page-enter">

                    <div className="max-w-7xl mx-auto">

                        {/* Page Header */}
                        <div className="mb-8">

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

                                <div>

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
                                        <span>₹</span>
                                        Payment Management
                                    </div>

                                    <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                        Payments
                                    </h1>

                                    <p className="mt-2 text-slate-500 max-w-2xl">
                                        Monitor payment transactions, amounts, gateway
                                        IDs, and payment status.
                                    </p>

                                </div>

                                <button
                                    onClick={fetchPayments}
                                    disabled={loading}
                                    className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50 shadow-sm"
                                >
                                    <span>↻</span>
                                    {loading ? "Refreshing..." : "Refresh Payments"}
                                </button>

                            </div>

                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">

                            {/* Total Payments */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Payments
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : payments.length}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            All payment records
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg">
                                        ₹
                                    </div>

                                </div>

                            </div>

                            {/* Successful */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Successful
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : successfulPayments}
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-600">
                                            Completed payments
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                                        ✓
                                    </div>

                                </div>

                            </div>

                            {/* Pending */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Pending
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : pendingPayments}
                                        </p>

                                        <p className="mt-1 text-xs text-amber-600">
                                            Awaiting completion
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                                        !
                                    </div>

                                </div>

                            </div>

                            {/* Revenue */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Successful Revenue
                                        </p>

                                        <p className="mt-2 text-2xl font-bold text-slate-900">
                                            {loading
                                                ? "..."
                                                : `₹${totalRevenue.toLocaleString("en-IN")}`}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            From successful payments
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
                                        ₹
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Payments Card */}
                        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">

                            {/* Card Header */}
                            <div className="px-5 sm:px-6 py-5 border-b border-slate-200/80">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">
                                            All Payments
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Payment transactions recorded in the system.
                                        </p>
                                    </div>

                                    <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold self-start">
                                        {loading
                                            ? "Loading..."
                                            : `${payments.length} Payment${payments.length !== 1 ? "s" : ""}`}
                                    </div>

                                </div>

                            </div>

                            {/* Loading */}
                            {loading ? (

                                <div className="p-6 space-y-3">

                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <div
                                            key={item}
                                            className="h-20 rounded-2xl skeleton"
                                        />
                                    ))}

                                </div>

                            ) : payments.length === 0 ? (

                                /* Empty State */
                                <div className="px-6 py-16 text-center">

                                    <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                                        ₹
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        No payments found
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        No payment transactions have been recorded yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[1150px]">

                                        <thead>

                                            <tr className="bg-slate-50/70 border-b border-slate-200">

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Member
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Plan
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Amount
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Payment ID
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Payment Date
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody className="divide-y divide-slate-100">

                                            {payments.map((payment) => (

                                                <tr
                                                    key={payment.id}
                                                    className="hover:bg-slate-50/70 transition"
                                                >

                                                    {/* Member */}
                                                    <td className="px-6 py-5">

                                                        <div className="flex items-center gap-3">

                                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 flex items-center justify-center font-bold">
                                                                {payment.user?.name
                                                                    ?.charAt(0)
                                                                    .toUpperCase() || "U"}
                                                            </div>

                                                            <div>

                                                                <p className="font-semibold text-slate-900">
                                                                    {payment.user?.name || "Unknown"}
                                                                </p>

                                                                <p className="text-xs text-slate-400 mt-0.5">
                                                                    {payment.user?.email || "-"}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Plan */}
                                                    <td className="px-6 py-5">

                                                        <p className="font-semibold text-slate-900">
                                                            {payment.membership?.plan?.name || "-"}
                                                        </p>

                                                        <p className="text-xs text-slate-400 mt-1">
                                                            {payment.membership?.plan?.durationInMonths
                                                                ? `${payment.membership.plan.durationInMonths} month${
                                                                    payment.membership.plan.durationInMonths !== 1
                                                                        ? "s"
                                                                        : ""
                                                                }`
                                                                : "-"}
                                                        </p>

                                                    </td>

                                                    {/* Amount */}
                                                    <td className="px-6 py-5">

                                                        <p className="font-bold text-slate-900">
                                                            ₹{Number(
                                                                payment.amount || 0
                                                            ).toLocaleString("en-IN")}
                                                        </p>

                                                    </td>

                                                    {/* Payment ID */}
                                                    <td className="px-6 py-5">

                                                        <p
                                                            className="text-sm text-slate-600 max-w-[220px] truncate"
                                                            title={payment.gatewayId}
                                                        >
                                                            {payment.gatewayId || "-"}
                                                        </p>

                                                    </td>

                                                    {/* Date */}
                                                    <td className="px-6 py-5 text-sm text-slate-600">
                                                        {formatDate(payment.paymentDate)}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                                                                payment.status === "SUCCESS"
                                                                    ? "bg-emerald-50 text-emerald-700"
                                                                    : payment.status === "PENDING"
                                                                    ? "bg-amber-50 text-amber-700"
                                                                    : "bg-red-50 text-red-700"
                                                            }`}
                                                        >

                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    payment.status === "SUCCESS"
                                                                        ? "bg-emerald-500"
                                                                        : payment.status === "PENDING"
                                                                        ? "bg-amber-500"
                                                                        : "bg-red-500"
                                                                }`}
                                                            />

                                                            {payment.status}

                                                        </span>

                                                    </td>

                                                </tr>

                                            ))}

                                        </tbody>

                                    </table>

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminPayments;

