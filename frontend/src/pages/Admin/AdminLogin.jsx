import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/authContext";

function AdminLogin() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter email and password");
      return;
    }

    setLoading(true);

    try {
      const response = await loginUser(formData);

      const user = response.data;

      if (user.role !== "ADMIN") {
        toast.error("Access denied. Admin account required.");
        return;
      }

      login(user);

      toast.success("Admin login successful");

      navigate("/admin/dashboard");
    } catch (error) {
      toast.error(error.message || "Admin login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] flex items-center justify-center px-4 py-8 relative overflow-hidden">

      {/* Background decoration */}
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-indigo-600/15 blur-3xl" />

      <div className="relative w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 items-center justify-center text-white text-2xl font-black shadow-lg shadow-violet-900/40">
            S
          </div>

          <h1 className="text-2xl font-bold text-white mt-4">
            Smart Gym
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            Admin Management Portal
          </p>
        </div>

        {/* Login card */}
        <div className="rounded-3xl border border-white/[0.08] bg-white/[0.045] backdrop-blur-xl p-6 sm:p-8 shadow-2xl">

          <div className="mb-7">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-400 mb-2">
              Administrator
            </p>

            <h2 className="text-2xl font-bold text-white">
              Welcome back
            </h2>

            <p className="text-sm text-slate-500 mt-2">
              Sign in to manage your gym platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Email address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@example.com"
                className="w-full h-12 px-4 rounded-xl border border-white/[0.08] bg-black/20 text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 transition"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl border border-white/[0.08] bg-black/20 text-white placeholder:text-slate-600 outline-none focus:border-violet-500/60 focus:ring-2 focus:ring-violet-500/10 transition"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow-lg shadow-violet-900/25 hover:from-violet-500 hover:to-indigo-500 disabled:opacity-60 disabled:cursor-not-allowed transition"
            >
              {loading ? "Signing in..." : "Sign in as Admin"}
            </button>
          </form>

          {/* Security info */}
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
            <span className="text-emerald-400">●</span>
            Secure administrator access
          </div>
        </div>

        {/* Back */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className="w-full mt-5 text-sm text-slate-500 hover:text-white transition"
        >
          ← Back to Smart Gym
        </button>

      </div>
    </div>
  );
}

export default AdminLogin;