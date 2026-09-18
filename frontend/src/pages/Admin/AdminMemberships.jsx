import AdminSidebar from './../../components/layout/Admin/AdminSidebar';
import AdminDashboardHeader from './../../components/layout/Admin/AdminDashboardHeader';

import { getAllMemberships } from '../../services/admin/adminMembershipService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

function AdminMemberships(){
    const [memberships,setMemberships]=useState([]);
    const [loading,setLoading]=useState(true);

    const fetchMemberships=async ()=>{
        try{
            setLoading(true);
            const response=await getAllMemberships();

            setMemberships(response.data || []);
        }catch(error){
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(()=>{
        const timer=setTimeout(()=>{
            fetchMemberships();
        },0);

        return ()=>clearTimeout(timer);
    },[]);

    const formatDate =(date)=>{
        return new Date(date).toLocaleDateString("en-IN",{
            day:"2-digit",
            month:"short",
            year:"numeric"
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 flex">

            <AdminSidebar />

            <div className="flex-1 min-w-0">

                <AdminDashboardHeader />

                <main className="p-5 sm:p-7 lg:p-9">

                    {/* Header */}
                    <div className="mb-8">

                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                            Membership Management
                        </p>

                        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                            Memberships
                        </h1>

                        <p className="text-sm text-slate-500 mt-2">
                            View memberships purchased by gym members.
                        </p>

                    </div>

                    {/* Membership Table */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        <div className="px-6 py-5 border-b border-slate-100">

                            <h2 className="font-bold text-slate-900">
                                All Memberships
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                {memberships.length} membership
                                {memberships.length !== 1 ? "s" : ""} found
                            </p>

                        </div>

                        {loading ? (

                            <div className="p-10 text-center text-slate-500">
                                Loading memberships...
                            </div>

                        ) : memberships.length === 0 ? (

                            <div className="p-10 text-center text-slate-500">
                                No memberships found.
                            </div>

                        ) : (

                            <div className="overflow-x-auto">

                                <table className="w-full min-w-[900px]">

                                    <thead className="bg-slate-50 border-b border-slate-200">

                                        <tr>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Member
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Plan
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Price
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                Start Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
                                                End Date
                                            </th>

                                            <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">
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

                                                        <div className="w-10 h-10 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                                                            {membership.user?.name
                                                                ?.charAt(0)
                                                                .toUpperCase() || "U"}
                                                        </div>

                                                        <div>

                                                            <p className="font-semibold text-slate-900">
                                                                {membership.user?.name || "Unknown"}
                                                            </p>

                                                            <p className="text-xs text-slate-500 mt-0.5">
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

                                                    <p className="text-xs text-slate-500 mt-1">
                                                        {membership.plan?.durationInMonths} month
                                                        {membership.plan?.durationInMonths !== 1
                                                            ? "s"
                                                            : ""}
                                                    </p>

                                                </td>

                                                {/* Price */}
                                                <td className="px-6 py-5">

                                                    <p className="font-semibold text-slate-900">
                                                        ₹{Number(membership.plan?.price || 0).toLocaleString("en-IN")}
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
                                                        className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${
                                                            membership.status === "ACTIVE"
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : "bg-slate-100 text-slate-500"
                                                        }`}
                                                    >
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

                </main>

            </div>

        </div>
    );
}

export default AdminMemberships;

