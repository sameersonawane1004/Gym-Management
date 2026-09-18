
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

import AdminSidebar from "../../components/layout/Admin/AdminSidebar";
import AdminDashboardHeader from "../../components/layout/Admin/AdminDashboardHeader";

import {
    getAllAdminMembershipPlans,
    createMembershipPlan,
    updateMembershipPlan,
    deleteMembershipPlan
} from "../../services/admin/adminPlanService";


function AdminPlans() {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);

    const [showForm, setShowForm] = useState(false);
    const [editingPlan, setEditingPlan] = useState(null);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
        price: "",
        durationInMonths: ""
    });

    // Fetch plans
    const fetchPlans = async () => {
        try {
            setLoading(true);

            const response = await getAllAdminMembershipPlans();

            setPlans(response.data || []);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPlans();
        }, 0);

        return () => clearTimeout(timer);
    }, []);

    // Form input change
    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // Open create form
    const handleAddPlan = () => {
        setEditingPlan(null);

        setFormData({
            name: "",
            description: "",
            price: "",
            durationInMonths: ""
        });

        setShowForm(true);
    };

    // Open edit form
    const handleEdit = (plan) => {
        setEditingPlan(plan);

        setFormData({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            durationInMonths: plan.durationInMonths
        });

        setShowForm(true);
    };

    // Submit form
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const planData = {
                name: formData.name,
                description: formData.description,
                price: Number(formData.price),
                durationInMonths: Number(formData.durationInMonths)
            };

            if (editingPlan) {
                await updateMembershipPlan(editingPlan.id, {
                    ...planData,
                    isActive: editingPlan.isActive
                });

                toast.success("Membership plan updated successfully");
            } else {
                await createMembershipPlan(planData);

                toast.success("Membership plan created successfully");
            }

            setShowForm(false);
            setEditingPlan(null);

            await fetchPlans();
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Activate / deactivate
    const handleToggleStatus = async (plan) => {
        try {
            await updateMembershipPlan(plan.id, {
                name: plan.name,
                description: plan.description,
                price: Number(plan.price),
                durationInMonths: plan.durationInMonths,
                isActive: !plan.isActive
            });

            toast.success(
                plan.isActive
                    ? "Plan deactivated"
                    : "Plan activated"
            );

            await fetchPlans();
        } catch (error) {
            toast.error(error.message);
        }
    };

    // Delete plan
    const handleDelete = async (plan) => {
        const confirmed = window.confirm(
            `Are you sure you want to delete "${plan.name}"?`
        );

        if (!confirmed) {
            return;
        }

        try {
            await deleteMembershipPlan(plan.id);

            toast.success("Membership plan deleted successfully");

            await fetchPlans();
        } catch (error) {
            toast.error(error.message);
        }
    };

    const activePlans = plans.filter((plan) => plan.isActive).length;
    const inactivePlans = plans.filter((plan) => !plan.isActive).length;

    return (
        <div className="h-screen bg-slate-50 flex overflow-hidden">

            {/* Sidebar */}
            <AdminSidebar />

            {/* Main Area */}
            <main className="flex-1 min-w-0 md:ml-[270px] h-screen overflow-y-auto">

                <AdminDashboardHeader
                    title="Membership Plans"
                    description="Create and manage membership plans for your gym."
                />

                <div className="p-5 sm:p-7 lg:p-9 page-enter">

                    <div className="max-w-7xl mx-auto">

                        {/* Page Header */}
                        <div className="mb-8">

                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">

                                <div>

                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 border border-violet-100 text-violet-700 text-xs font-semibold">
                                        <span>◇</span>
                                        Membership Management
                                    </div>

                                    <h1 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
                                        Membership Plans
                                    </h1>

                                    <p className="mt-2 text-slate-500 max-w-2xl">
                                        Create, update, activate, and manage membership
                                        plans available to gym members.
                                    </p>

                                </div>

                                <button
                                    onClick={handleAddPlan}
                                    className="self-start lg:self-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition shadow-sm"
                                >
                                    <span className="text-lg leading-none">+</span>
                                    Add New Plan
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
                                            Total Plans
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : plans.length}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            All membership plans
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center text-lg">
                                        ◇
                                    </div>

                                </div>

                            </div>

                            {/* Active */}
                            <div className="bg-white border border-slate-200/80 rounded-2xl p-5 shadow-sm">

                                <div className="flex items-center justify-between">

                                    <div>
                                        <p className="text-sm font-medium text-slate-500">
                                            Active Plans
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : activePlans}
                                        </p>

                                        <p className="mt-1 text-xs text-emerald-600">
                                            Currently available
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
                                            Inactive Plans
                                        </p>

                                        <p className="mt-2 text-3xl font-bold text-slate-900">
                                            {loading ? "..." : inactivePlans}
                                        </p>

                                        <p className="mt-1 text-xs text-slate-400">
                                            Currently unavailable
                                        </p>
                                    </div>

                                    <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-lg">
                                        !
                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* Create / Edit Form */}
                        {showForm && (
                            <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm p-6 sm:p-7 mb-8">

                                <div className="flex items-start justify-between gap-4 mb-7">

                                    <div>

                                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-50 text-violet-700 text-xs font-semibold">
                                            {editingPlan ? "Edit Plan" : "New Plan"}
                                        </div>

                                        <h2 className="mt-3 text-xl font-bold text-slate-900">
                                            {editingPlan
                                                ? "Edit Membership Plan"
                                                : "Create Membership Plan"}
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Enter the membership plan details below.
                                        </p>

                                    </div>

                                    <button
                                        onClick={() => {
                                            setShowForm(false);
                                            setEditingPlan(null);
                                        }}
                                        className="w-9 h-9 shrink-0 rounded-xl bg-slate-100 text-slate-500 hover:bg-slate-200 transition"
                                    >
                                        ×
                                    </button>

                                </div>

                                <form
                                    onSubmit={handleSubmit}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-5"
                                >

                                    {/* Plan Name */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Plan Name
                                        </label>

                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="e.g. Premium"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
                                        />
                                    </div>

                                    {/* Price */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Price (₹)
                                        </label>

                                        <input
                                            type="number"
                                            name="price"
                                            value={formData.price}
                                            onChange={handleChange}
                                            placeholder="2999"
                                            min="0"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
                                        />
                                    </div>

                                    {/* Duration */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Duration (Months)
                                        </label>

                                        <input
                                            type="number"
                                            name="durationInMonths"
                                            value={formData.durationInMonths}
                                            onChange={handleChange}
                                            placeholder="3"
                                            min="1"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
                                        />
                                    </div>

                                    {/* Description */}
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                                            Description
                                        </label>

                                        <input
                                            type="text"
                                            name="description"
                                            value={formData.description}
                                            onChange={handleChange}
                                            placeholder="Access to all gym equipment"
                                            required
                                            className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 outline-none focus:bg-white focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition"
                                        />
                                    </div>

                                    {/* Buttons */}
                                    <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end gap-3 pt-3">

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setShowForm(false);
                                                setEditingPlan(null);
                                            }}
                                            className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
                                        >
                                            Cancel
                                        </button>

                                        <button
                                            type="submit"
                                            className="px-5 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition"
                                        >
                                            {editingPlan
                                                ? "Update Plan"
                                                : "Create Plan"}
                                        </button>

                                    </div>

                                </form>

                            </div>
                        )}

                        {/* Plans Card */}
                        <div className="bg-white border border-slate-200/80 rounded-3xl shadow-sm overflow-hidden">

                            {/* Card Header */}
                            <div className="px-5 sm:px-6 py-5 border-b border-slate-200/80">

                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

                                    <div>
                                        <h2 className="text-lg font-bold text-slate-900">
                                            All Membership Plans
                                        </h2>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Manage pricing, duration, availability,
                                            and plan details.
                                        </p>
                                    </div>

                                    <div className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold self-start">
                                        {loading
                                            ? "Loading..."
                                            : `${plans.length} Plan${plans.length !== 1 ? "s" : ""}`}
                                    </div>

                                </div>

                            </div>

                            {/* Loading */}
                            {loading ? (
                                <div className="p-6 space-y-3">

                                    {[1, 2, 3, 4].map((item) => (
                                        <div
                                            key={item}
                                            className="h-24 rounded-2xl skeleton"
                                        />
                                    ))}

                                </div>
                            ) : plans.length === 0 ? (

                                /* Empty State */
                                <div className="px-6 py-16 text-center">

                                    <div className="mx-auto w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-2xl">
                                        ◇
                                    </div>

                                    <h3 className="mt-5 text-lg font-bold text-slate-900">
                                        No membership plans found
                                    </h3>

                                    <p className="mt-2 text-sm text-slate-500">
                                        Create your first membership plan to make
                                        it available to members.
                                    </p>

                                    <button
                                        onClick={handleAddPlan}
                                        className="mt-5 px-5 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
                                    >
                                        + Create Plan
                                    </button>

                                </div>

                            ) : (

                                /* Plans */
                                <div className="divide-y divide-slate-100">

                                    {plans.map((plan) => (

                                        <div
                                            key={plan.id}
                                            className="p-5 sm:p-6 hover:bg-slate-50/70 transition"
                                        >

                                            <div className="flex flex-col xl:flex-row xl:items-center gap-5">

                                                {/* Plan Information */}
                                                <div className="flex items-start gap-4 flex-1 min-w-0">

                                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 text-violet-700 flex items-center justify-center font-bold text-lg">
                                                        {plan.name
                                                            ?.charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0">

                                                        <div className="flex items-center gap-3 flex-wrap">

                                                            <h3 className="font-bold text-slate-900">
                                                                {plan.name}
                                                            </h3>

                                                            <span
                                                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                                    plan.isActive
                                                                        ? "bg-emerald-50 text-emerald-700"
                                                                        : "bg-slate-100 text-slate-500"
                                                                }`}
                                                            >
                                                                <span
                                                                    className={`w-1.5 h-1.5 rounded-full ${
                                                                        plan.isActive
                                                                            ? "bg-emerald-500"
                                                                            : "bg-slate-400"
                                                                    }`}
                                                                />

                                                                {plan.isActive
                                                                    ? "Active"
                                                                    : "Inactive"}
                                                            </span>

                                                        </div>

                                                        <p className="text-sm text-slate-500 mt-1.5 max-w-xl">
                                                            {plan.description}
                                                        </p>

                                                        <p className="text-xs text-slate-400 mt-2">
                                                            Plan ID #{plan.id}
                                                        </p>

                                                    </div>

                                                </div>

                                                {/* Price / Duration */}
                                                <div className="flex items-center gap-8 sm:gap-12">

                                                    <div>
                                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                                            Price
                                                        </p>

                                                        <p className="mt-1 text-lg font-bold text-slate-900">
                                                            ₹{Number(plan.price).toLocaleString("en-IN")}
                                                        </p>
                                                    </div>

                                                    <div>
                                                        <p className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                                                            Duration
                                                        </p>

                                                        <p className="mt-1 text-lg font-bold text-slate-900">
                                                            {plan.durationInMonths}{" "}
                                                            {plan.durationInMonths === 1
                                                                ? "Month"
                                                                : "Months"}
                                                        </p>
                                                    </div>

                                                </div>

                                                {/* Actions */}
                                                <div className="flex flex-wrap items-center gap-2 xl:justify-end">

                                                    <button
                                                        onClick={() => handleEdit(plan)}
                                                        className="px-4 py-2.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200 transition"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleToggleStatus(plan)
                                                        }
                                                        className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition ${
                                                            plan.isActive
                                                                ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                                                : "bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                                                        }`}
                                                    >
                                                        {plan.isActive
                                                            ? "Deactivate"
                                                            : "Activate"}
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(plan)
                                                        }
                                                        className="px-4 py-2.5 rounded-xl bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100 transition"
                                                    >
                                                        Delete
                                                    </button>

                                                </div>

                                            </div>

                                        </div>

                                    ))}

                                </div>

                            )}

                        </div>

                    </div>

                </div>

            </main>

        </div>
    );
}

export default AdminPlans;

