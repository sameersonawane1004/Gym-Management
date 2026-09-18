import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/layout/Admin/AdminSidebar"
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

    return (
        <div className="min-h-screen bg-slate-50 flex">
            <AdminSidebar />

            <div className="flex-1 min-w-0">
                <AdminDashboardHeader />

                <main className="p-5 sm:p-7 lg:p-9">

                    {/* Page Header */}
                    <div className="mb-8">
                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                            Payment Management
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                            Payments
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            View payment transactions made by gym members.
                        </p>
                    </div>

                    {/* Payments Card */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="font-bold text-slate-900">
                                All Payments
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                {payments.length} payment
                                {payments.length !== 1 ? "s" : ""} found
                            </p>
                        </div>

                        {/* Loading */}
                        {loading ? (
                            <div className="p-10 text-center text-slate-500">
                                Loading payments...
                            </div>
                        ) : payments.length === 0 ? (
                            <div className="p-10 text-center text-slate-500">
                                No payments found.
                            </div>
                        ) : (
                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[1100px]">

                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Member
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Plan
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Amount
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Payment ID
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Payment Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
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

                                                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                                                            {payment.user?.name
                                                                ?.charAt(0)
                                                                .toUpperCase() || "U"}
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-slate-900">
                                                                {payment.user?.name || "Unknown"}
                                                            </p>

                                                            <p className="text-xs text-slate-500 mt-0.5">
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

                                                    <p className="text-xs text-slate-500 mt-1">
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

                                                    <p className="font-semibold text-slate-900">
                                                        ₹
                                                        {Number(payment.amount || 0).toLocaleString(
                                                            "en-IN"
                                                        )}
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
                                                        className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                            payment.status === "SUCCESS"
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : payment.status === "PENDING"
                                                                ? "bg-amber-50 text-amber-600"
                                                                : "bg-red-50 text-red-600"
                                                        }`}
                                                    >
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

                </main>
            </div>
        </div>
    );
}

export default AdminPayments;