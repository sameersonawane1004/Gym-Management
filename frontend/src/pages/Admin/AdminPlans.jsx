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

    return (
        <div className="min-h-screen bg-slate-50 flex">

            <AdminSidebar />

            <div className="flex-1 min-w-0">

                <AdminDashboardHeader />

                <main className="p-5 sm:p-7 lg:p-9">

                    {/* Page Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">

                        <div>
                            <p className="text-xs font-semibold uppercase tracking-wider text-violet-600">
                                Membership Management
                            </p>

                            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                                Membership Plans
                            </h1>

                            <p className="text-sm text-slate-500 mt-2">
                                Create and manage membership plans for your gym.
                            </p>
                        </div>

                        <button
                            onClick={handleAddPlan}
                            className="px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700 transition shadow-lg shadow-violet-200"
                        >
                            + Add New Plan
                        </button>

                    </div>

                    {/* Form */}
                    {showForm && (
                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 mb-8">

                            <div className="flex items-center justify-between mb-6">

                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        {editingPlan
                                            ? "Edit Membership Plan"
                                            : "Create Membership Plan"}
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Enter the plan details below.
                                    </p>
                                </div>

                                <button
                                    onClick={() => setShowForm(false)}
                                    className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200"
                                >
                                    ×
                                </button>

                            </div>

                            <form
                                onSubmit={handleSubmit}
                                className="grid grid-cols-1 md:grid-cols-2 gap-5"
                            >

                                {/* Name */}
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
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
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
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
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
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
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
                                        className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
                                    />
                                </div>

                                {/* Buttons */}
                                <div className="md:col-span-2 flex justify-end gap-3 pt-2">

                                    <button
                                        type="button"
                                        onClick={() => setShowForm(false)}
                                        className="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
                                    >
                                        Cancel
                                    </button>

                                    <button
                                        type="submit"
                                        className="px-5 py-3 rounded-xl bg-violet-600 text-white font-semibold hover:bg-violet-700"
                                    >
                                        {editingPlan
                                            ? "Update Plan"
                                            : "Create Plan"}
                                    </button>

                                </div>

                            </form>

                        </div>
                    )}

                    {/* Plans */}
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

                        <div className="px-6 py-5 border-b border-slate-100">
                            <h2 className="font-bold text-slate-900">
                                All Plans
                            </h2>

                            <p className="text-sm text-slate-500 mt-1">
                                {plans.length} plan{plans.length !== 1 ? "s" : ""} found
                            </p>
                        </div>

                        {loading ? (

                            <div className="p-10 text-center text-slate-500">
                                Loading membership plans...
                            </div>

                        ) : plans.length === 0 ? (

                            <div className="p-10 text-center">

                                <p className="text-slate-500">
                                    No membership plans found.
                                </p>

                                <button
                                    onClick={handleAddPlan}
                                    className="mt-4 text-violet-600 font-semibold hover:underline"
                                >
                                    Create your first plan
                                </button>

                            </div>

                        ) : (

                            <div className="divide-y divide-slate-100">

                                {plans.map((plan) => (

                                    <div
                                        key={plan.id}
                                        className="p-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 hover:bg-slate-50/70 transition"
                                    >

                                        {/* Plan Info */}
                                        <div className="flex items-start gap-4">

                                            <div className="w-12 h-12 rounded-xl bg-violet-100 text-violet-600 flex items-center justify-center font-bold">
                                                {plan.name?.charAt(0).toUpperCase()}
                                            </div>

                                            <div>

                                                <div className="flex items-center gap-3 flex-wrap">

                                                    <h3 className="font-bold text-slate-900">
                                                        {plan.name}
                                                    </h3>

                                                    <span
                                                        className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                                                            plan.isActive
                                                                ? "bg-emerald-50 text-emerald-600"
                                                                : "bg-slate-100 text-slate-500"
                                                        }`}
                                                    >
                                                        {plan.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </span>

                                                </div>

                                                <p className="text-sm text-slate-500 mt-1">
                                                    {plan.description}
                                                </p>

                                            </div>

                                        </div>

                                        {/* Price */}
                                        <div className="flex items-center gap-8">

                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Price
                                                </p>

                                                <p className="font-bold text-slate-900">
                                                    ₹{Number(plan.price).toLocaleString("en-IN")}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Duration
                                                </p>

                                                <p className="font-bold text-slate-900">
                                                    {plan.durationInMonths} month
                                                    {plan.durationInMonths !== 1
                                                        ? "s"
                                                        : ""}
                                                </p>
                                            </div>

                                        </div>

                                        {/* Actions */}
                                        <div className="flex items-center gap-2">

                                            <button
                                                onClick={() => handleEdit(plan)}
                                                className="px-4 py-2 rounded-lg bg-slate-100 text-slate-700 text-sm font-semibold hover:bg-slate-200"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => handleToggleStatus(plan)}
                                                className={`px-4 py-2 rounded-lg text-sm font-semibold ${
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
                                                onClick={() => handleDelete(plan)}
                                                className="px-4 py-2 rounded-lg bg-red-50 text-red-600 text-sm font-semibold hover:bg-red-100"
                                            >
                                                Delete
                                            </button>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        )}

                    </div>

                </main>

            </div>

        </div>
    );
}

export default AdminPlans;