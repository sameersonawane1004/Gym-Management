
import AdminSidebar from "../../components/layout/Admin/AdminSidebar";
import AdminDashboardHeader from "../../components/layout/Admin/AdminDashboardHeader";

import { getAllMemberships } from "../../services/admin/adminMembershipService";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function AdminMemberships() {
    const [memberships, setMemberships] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchMemberships = async () => {
        try {
            setLoading(true);

            const response = await getAllMemberships();

            setMemberships(response.data || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchMemberships();
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

    const activeMemberships = memberships.filter(
        (membership) => membership.status === "ACTIVE"
    ).length;

    const inactiveMemberships = memberships.filter(
        (membership) => membership.status !== "ACTIVE"
    ).length;

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">

            <AdminSidebar />

            <main className="flex-1 min-w-0 md:ml-[270px] h-screen overflow-y-auto">

                <AdminDashboardHeader
                    title="Membership Management"
                    description="View memberships purchased by gym members."
                />

                <div className="p-5 sm:p-7 lg:p-9 page-enter">

                    <div className="max-w-7xl mx-auto">

                        {/* Page Header */}
                        <div className="mb-8">

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

                                <div>

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
                                        <span>▣</span>
                                        Membership Management
                                    </div>

                                    <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                        Memberships
                                    </h1>

                                    <p className="mt-2 text-slate-500 max-w-2xl">
                                        Monitor memberships purchased by gym members,
                                        including plans, dates, and current status.
                                    </p>

                                </div>

                                <button
                                    onClick={fetchMemberships}
                                    disabled={loading}
                                    className="self-start lg:self-auto inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition disabled:opacity-50 shadow-sm"
                                >
                                    <span>↻</span>
                                    {loading ? "Refreshing..." : "Refresh"}
                                </button>

                            </div>

                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">

                            {/* Total */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Total Memberships
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : memberships.length}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            All membership records
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg">
                                        ▣
                                    </div>

                                </div>

                            </div>

                            {/* Active */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Active Memberships
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : activeMemberships}
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-600">
                                            Currently active
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
                                        ✓
                                    </div>

                                </div>

                            </div>

                            {/* Inactive */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Other Memberships
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : inactiveMemberships}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Non-active records
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-slate-100 text-slate-600 flex items-center justify-center text-lg">
                                        •
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Membership Table */}
                        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">

                            <div className="px-5 sm:px-6 py-5 border-b border-slate-200/80">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">
                                            All Memberships
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Membership records purchased by registered
                                            gym members.
                                        </p>
                                    </div>

                                    <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold self-start">
                                        {loading
                                            ? "Loading..."
                                            : `${memberships.length} Membership${memberships.length !== 1 ? "s" : ""}`}
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

                            ) : memberships.length === 0 ? (

                                /* Empty State */
                                <div className="px-6 py-16 text-center">

                                    <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                                        ▣
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        No memberships found
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        No members have purchased a membership yet.
                                    </p>

                                </div>

                            ) : (

                                <div className="overflow-x-auto">

                                    <table className="w-full min-w-[1000px]">

                                        <thead>

                                            <tr className="bg-slate-50/70 border-b border-slate-200">

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Member
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Plan
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Price
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Start Date
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    End Date
                                                </th>

                                                <th className="px-6 py-4 text-left text-[11px] font-bold uppercase tracking-wider text-slate-500">
                                                    Status
                                                </th>

                                            </tr>

                                        </thead>

                                        <tbody className="divide-y divide-slate-100">

                                            {memberships.map((membership) => (

                                                <tr
                                                    key={membership.id}
                                                    className="hover:bg-slate-50/70 transition"
                                                >

                                                    {/* Member */}
                                                    <td className="px-6 py-5">

                                                        <div className="flex items-center gap-3">

                                                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 flex items-center justify-center font-bold">
                                                                {membership.user?.name
                                                                    ?.charAt(0)
                                                                    .toUpperCase() || "U"}
                                                            </div>

                                                            <div>

                                                                <p className="font-semibold text-slate-900">
                                                                    {membership.user?.name || "Unknown"}
                                                                </p>

                                                                <p className="text-xs text-slate-400 mt-0.5">
                                                                    {membership.user?.email || "-"}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </td>

                                                    {/* Plan */}
                                                    <td className="px-6 py-5">

                                                        <p className="font-semibold text-slate-900">
                                                            {membership.plan?.name || "-"}
                                                        </p>

                                                        <p className="text-xs text-slate-400 mt-1">
                                                            {membership.plan?.durationInMonths || "-"}{" "}
                                                            {membership.plan?.durationInMonths === 1
                                                                ? "Month"
                                                                : "Months"}
                                                        </p>

                                                    </td>

                                                    {/* Price */}
                                                    <td className="px-6 py-5">

                                                        <p className="font-semibold text-slate-900">
                                                            ₹{Number(
                                                                membership.plan?.price || 0
                                                            ).toLocaleString("en-IN")}
                                                        </p>

                                                    </td>

                                                    {/* Start */}
                                                    <td className="px-6 py-5 text-sm text-slate-600">
                                                        {formatDate(membership.startDate)}
                                                    </td>

                                                    {/* End */}
                                                    <td className="px-6 py-5 text-sm text-slate-600">
                                                        {formatDate(membership.endDate)}
                                                    </td>

                                                    {/* Status */}
                                                    <td className="px-6 py-5">

                                                        <span
                                                            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-semibold ${
                                                                membership.status === "ACTIVE"
                                                                    ? "bg-emerald-50 text-emerald-700"
                                                                    : "bg-slate-100 text-slate-500"
                                                            }`}
                                                        >

                                                            <span
                                                                className={`w-1.5 h-1.5 rounded-full ${
                                                                    membership.status === "ACTIVE"
                                                                        ? "bg-emerald-500"
                                                                        : "bg-slate-400"
                                                                }`}
                                                            />

                                                            {membership.status}

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

export default AdminMemberships;

