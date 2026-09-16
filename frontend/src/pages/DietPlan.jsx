import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";
import {
  generateDietPlan,
  getMyDietPlans,
  deleteDietPlan,
} from "../services/dietPlanService";

function DietPlan() {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    height: "",
    weight: "",
    activityLevel: "",
    goal: "",
    dietaryPreference: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [plan, setPlan] = useState(null);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [dietPlans, setDietPlans] = useState([]);
  const [historyLoading, setHistoryLoading] = useState(true);

  useEffect(() => {
    const fetchDietPlans = async () => {
      try {
        const response = await getMyDietPlans();

        if (response.success) {
          setDietPlans(response.data || []);
        }
      } catch (error) {
        console.error("Failed to fetch diet plan history:", error);
      } finally {
        setHistoryLoading(false);
      }
    };

    fetchDietPlans();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setPlan(null);
    setLoading(true);

    try {
      const response = await generateDietPlan(formData);

      if (response.success) {
        setPlan(response.data);

        setDietPlans((prev) => [
    response.data,
    ...prev,
  ]);
      } else {
        setError(response.message || "Failed to generate diet plan");
      }
    } catch (error) {
      setError(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteDietPlan = async (dietPlanId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this diet plan?",
    );

    if (!confirmed) {
      return;
    }

    setDeleteLoading(true);

    try {
      await deleteDietPlan(dietPlanId);

      setDietPlans((prev) =>
        prev.filter((dietPlan) => dietPlan.id !== dietPlanId),
      );

      if (plan?.id === dietPlanId) {
        setPlan(null);
      }
    } catch (error) {
      setError(error.message || "Failed to delete diet plan");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <DashboardHeader
          title="AI Diet Plan"
          description="Create a personalized wellness-oriented nutrition plan"
        />

        <main className="page-enter p-5 sm:p-7 lg:p-9">
          <div className="max-w-6xl mx-auto">
            {/* Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-[#111118] p-6 sm:p-8 lg:p-10 text-white shadow-xl shadow-slate-200/50">
              <div className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-indigo-600/10 blur-3xl" />

              <div className="relative max-w-3xl">
                <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-400/20 text-violet-300 text-xs font-semibold">
                  ✦ AI Nutrition Assistant
                </span>

                <h1 className="mt-4 text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight">
                  Build a diet plan around your goals.
                </h1>

                <p className="mt-3 text-sm sm:text-base leading-7 text-slate-400 max-w-2xl">
                  Enter your basic fitness and dietary information and let AI
                  generate a practical wellness-oriented nutrition plan for you.
                </p>
              </div>
            </section>

            {/* Form */}
            <section className="mt-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-7 lg:p-8">
              <div className="mb-7">
                <h2 className="text-lg font-bold text-slate-900">
                  Your information
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Provide accurate information for a more useful plan.
                </p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Age */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Age
                    </label>
                    <input
                      type="number"
                      name="age"
                      value={formData.age}
                      onChange={handleChange}
                      placeholder="e.g. 25"
                      min="1"
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-400 outline-none transition"
                    />
                  </div>

                  {/* Gender */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:bg-white focus:border-violet-400 outline-none transition"
                    >
                      <option value="">Select gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  {/* Height */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      name="height"
                      value={formData.height}
                      onChange={handleChange}
                      placeholder="e.g. 175"
                      min="1"
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-400 outline-none transition"
                    />
                  </div>

                  {/* Weight */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Weight (kg)
                    </label>
                    <input
                      type="number"
                      name="weight"
                      value={formData.weight}
                      onChange={handleChange}
                      placeholder="e.g. 70"
                      min="1"
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-400 outline-none transition"
                    />
                  </div>

                  {/* Activity */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Activity level
                    </label>
                    <select
                      name="activityLevel"
                      value={formData.activityLevel}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:bg-white focus:border-violet-400 outline-none transition"
                    >
                      <option value="">Select activity level</option>
                      <option value="Sedentary">Sedentary</option>
                      <option value="Lightly Active">Lightly Active</option>
                      <option value="Moderately Active">
                        Moderately Active
                      </option>
                      <option value="Very Active">Very Active</option>
                      <option value="Extremely Active">Extremely Active</option>
                    </select>
                  </div>

                  {/* Goal */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Fitness goal
                    </label>
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:bg-white focus:border-violet-400 outline-none transition"
                    >
                      <option value="">Select your goal</option>
                      <option value="Weight Loss">Weight Loss</option>
                      <option value="Muscle Gain">Muscle Gain</option>
                      <option value="Weight Maintenance">
                        Weight Maintenance
                      </option>
                      <option value="General Fitness">General Fitness</option>
                    </select>
                  </div>

                  {/* Dietary preference */}
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Dietary preference
                    </label>

                    <select
                      name="dietaryPreference"
                      value={formData.dietaryPreference}
                      onChange={handleChange}
                      required
                      className="w-full h-11 px-4 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 focus:bg-white focus:border-violet-400 outline-none transition"
                    >
                      <option value="">Select dietary preference</option>
                      <option value="Vegetarian">Vegetarian</option>
                      <option value="Non-Vegetarian">Non-Vegetarian</option>
                      <option value="Vegan">Vegan</option>
                      <option value="Eggetarian">Eggetarian</option>
                    </select>
                  </div>

                  {/* Allergies */}
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Allergies or foods to avoid
                      <span className="ml-2 text-xs font-normal text-slate-400">
                        Optional
                      </span>
                    </label>

                    <textarea
                      name="allergies"
                      value={formData.allergies}
                      onChange={handleChange}
                      rows="3"
                      placeholder="e.g. peanuts, lactose, seafood..."
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-violet-400 outline-none transition resize-none"
                    />
                  </div>
                </div>

                {/* Error */}
                {error && (
                  <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {error}
                  </div>
                )}

                {/* Submit */}
                <div className="mt-7 flex justify-end">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-auto min-w-[190px] h-11 px-6 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:bg-violet-400 text-white text-sm font-semibold shadow-lg shadow-violet-200 transition"
                  >
                    {loading ? "Generating plan..." : "Generate Diet Plan"}
                  </button>
                </div>
              </form>
            </section>

            {/* Generated plan */}
            {plan && (
              <section className="mt-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-7 lg:p-8">
                <div className="flex items-start justify-between gap-4 mb-6">
                  <div>
                    <span className="inline-flex px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-semibold">
                      ✓ Plan generated
                    </span>

                    <h2 className="mt-3 text-xl sm:text-2xl font-bold text-slate-900">
                      Your AI Diet Plan
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Goal: {plan.goal}
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5 sm:p-6">
                  <div className="space-y-1 text-sm leading-7 text-slate-700">
                    {plan.planContent.split("\n").map((line, index) => {
                      const trimmedLine = line.trim();

                      if (!trimmedLine) {
                        return <div key={index} className="h-2" />;
                      }

                      if (trimmedLine === "---") {
                        return (
                          <hr
                            key={index}
                            className="my-5 border-0 border-t border-slate-200"
                          />
                        );
                      }

                      if (
                        trimmedLine.startsWith("### **") &&
                        trimmedLine.endsWith("**")
                      ) {
                        const heading = trimmedLine
                          .replace("### **", "")
                          .replace("**", "");

                        return (
                          <h3
                            key={index}
                            className="pt-4 pb-2 text-lg font-bold text-slate-900"
                          >
                            {heading}
                          </h3>
                        );
                      }

                      if (
                        trimmedLine.startsWith("#### **") &&
                        trimmedLine.endsWith("**")
                      ) {
                        const heading = trimmedLine
                          .replace("#### **", "")
                          .replace("**", "");

                        return (
                          <h4
                            key={index}
                            className="pt-3 pb-1 text-base font-bold text-slate-800"
                          >
                            {heading}
                          </h4>
                        );
                      }

                      if (
                        trimmedLine.startsWith("*Disclaimer:") ||
                        trimmedLine.startsWith("Disclaimer:")
                      ) {
                        return (
                          <div
                            key={index}
                            className="mb-5 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm leading-6 text-amber-800"
                          >
                            {trimmedLine.replace(/^\*|\*$/g, "")}
                          </div>
                        );
                      }

                      if (trimmedLine.startsWith("*   ")) {
                        return (
                          <p key={index} className="pl-4 text-slate-700">
                            • {trimmedLine.replace("*   ", "")}
                          </p>
                        );
                      }

                      if (
                        trimmedLine.startsWith("1. ") ||
                        trimmedLine.match(/^\d+\.\s/)
                      ) {
                        return (
                          <p
                            key={index}
                            className="pl-1 font-medium text-slate-700"
                          >
                            {trimmedLine}
                          </p>
                        );
                      }

                      if (
                        trimmedLine.startsWith("*") &&
                        trimmedLine.endsWith("*")
                      ) {
                        return (
                          <p key={index} className="text-slate-500 italic">
                            {trimmedLine.replace(/^\*|\*$/g, "")}
                          </p>
                        );
                      }

                      return (
                        <p key={index} className="text-slate-700">
                          {trimmedLine}
                        </p>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-5 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
                  <p className="text-xs leading-5 text-violet-700">
                    <strong>Note:</strong> This AI-generated plan provides
                    general wellness guidance and is not medical advice.
                  </p>
                </div>
              </section>
            )}

            {/* Diet Plan History */}
            <section className="mt-6 rounded-3xl bg-white border border-slate-200/80 shadow-sm p-5 sm:p-7 lg:p-8">
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-900">
                  Diet Plan History
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View your previously generated diet plans.
                </p>
              </div>

              {historyLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="h-20 rounded-2xl bg-slate-100 animate-pulse"
                    />
                  ))}
                </div>
              ) : dietPlans.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50 p-8 text-center">
                  <div className="text-3xl mb-3">✦</div>

                  <h3 className="text-sm font-semibold text-slate-800">
                    No previous plans
                  </h3>

                  <p className="mt-1 text-sm text-slate-500">
                    Your generated diet plans will appear here.
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {dietPlans.map((dietPlan) => {
                    const isSelected = plan?.id === dietPlan.id;

                    return (
                      <button
                        key={dietPlan.id}
                        type="button"
                        onClick={() => setPlan(dietPlan)}
                        className={`w-full text-left rounded-2xl border p-4 transition-all duration-200 ${
                          isSelected
                            ? "border-violet-300 bg-violet-50/60 shadow-sm"
                            : "border-slate-200 bg-white hover:border-violet-300 hover:bg-violet-50/40"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          {/* Icon */}
                          <div
                            className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center ${
                              isSelected
                                ? "bg-violet-600 text-white"
                                : "bg-violet-50 text-violet-600"
                            }`}
                          >
                            ✦
                          </div>

                          {/* Details */}
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="text-sm font-semibold text-slate-900">
                                {dietPlan.goal}
                              </p>

                              {isSelected && (
                                <span className="px-2 py-0.5 rounded-full bg-violet-100 text-violet-700 text-[10px] font-bold uppercase tracking-wide">
                                  Selected
                                </span>
                              )}
                            </div>

                            <p className="mt-1 text-xs text-slate-500">
                              Generated on{" "}
                              {new Date(
                                dietPlan.createdAt,
                              ).toLocaleDateString()}
                            </p>
                          </div>

                          {/* Action */}
                          <div className="shrink-0 flex items-center gap-2">
                            <span
                              className={`hidden sm:block text-sm font-semibold ${
                                isSelected
                                  ? "text-violet-700"
                                  : "text-slate-500"
                              }`}
                            >
                              {isSelected ? "Viewing" : "View →"}
                            </span>

                            <button
                              type="button"
                              disabled={deleteLoading}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteDietPlan(dietPlan.id);
                              }}
                              className="w-9 h-9 rounded-xl border border-red-100 bg-red-50 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all duration-200 disabled:opacity-50"
                              aria-label="Delete diet plan"
                              title="Delete diet plan"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

export default DietPlan;
