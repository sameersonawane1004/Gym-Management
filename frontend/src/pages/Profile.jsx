import { useEffect, useState } from "react";
import { useAuth } from "../context/authContext";
import { getProfile, updateProfile } from "../services/userService";
import { getToken } from "../utils/token";
import Sidebar from "../components/layout/Sidebar";
import DashboardHeader from "../components/layout/DashboardHeader";

const Profile = () => {
  const { user, updateUser } = useAuth();

  const [profile, setProfile] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = getToken();
        const response = await getProfile(token);

        if (response.success) {
          setProfile(response.user);
          setName(response.user.name || "");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name cannot be empty.");
      setMessage("");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const token = getToken();
      const response = await updateProfile(name.trim(), token);

      if (response.success) {
        setProfile(response.user);
        setName(response.user.name);
        updateUser(response.user);
        setMessage("Profile updated successfully.");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  const displayName = profile?.name || user?.name || "User";
  const email = profile?.email || user?.email || "";
  const role = profile?.role || user?.role || "Member";
  const initial = displayName.charAt(0).toUpperCase();

  if (loading) {
    return (
      <div className="flex min-h-screen bg-slate-50">
        <Sidebar />

        <div className="flex-1 min-w-0">
          <DashboardHeader
            title="My Profile"
            description="Manage your personal information and account details."
          />

          <main className="p-5 sm:p-7 lg:p-9">
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="h-48 rounded-3xl skeleton" />

              <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
                <div className="h-72 rounded-3xl skeleton" />
                <div className="h-96 rounded-3xl skeleton" />
              </div>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1 min-w-0">
        <DashboardHeader
          title="My Profile"
          description="Manage your personal information and account details."
        />

        <main className="p-5 sm:p-7 lg:p-9 page-enter">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* Profile Hero */}
            <section className="relative overflow-hidden rounded-3xl bg-[#111118] text-white shadow-xl shadow-slate-200/50">
              <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-violet-600/20 blur-3xl" />
              <div className="absolute -bottom-28 left-1/3 w-80 h-80 rounded-full bg-indigo-600/10 blur-3xl" />

              <div className="relative p-6 sm:p-8 lg:p-9">
                <div className="flex flex-col sm:flex-row sm:items-center gap-6">

                  <div className="w-24 h-24 shrink-0 rounded-3xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-3xl font-bold shadow-xl shadow-violet-950/40">
                    {initial}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-violet-300 mb-2">
                      Account profile
                    </p>

                    <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {displayName}
                    </h1>

                    <p className="mt-2 text-sm text-slate-400 break-all">
                      {email}
                    </p>

                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-3 py-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      <span className="text-xs font-medium text-slate-300 capitalize">
                        {role.toLowerCase()}
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            </section>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">

              {/* Account Summary */}
              <aside className="space-y-6">

                <div className="glass-card soft-shadow rounded-3xl p-6">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-10 h-10 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                      ◉
                    </div>

                    <div>
                      <h3 className="font-semibold text-slate-900">
                        Account
                      </h3>
                      <p className="text-xs text-slate-400">
                        Your account details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Name
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800 break-words">
                        {displayName}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Email
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800 break-all">
                        {email}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                        Account type
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800 capitalize">
                        {role.toLowerCase()}
                      </p>
                    </div>

                  </div>
                </div>

                <div className="rounded-3xl border border-violet-100 bg-violet-50/70 p-6">
                  <div className="w-10 h-10 rounded-xl bg-white text-violet-600 flex items-center justify-center shadow-sm">
                    ✦
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    Keep your profile updated
                  </h3>

                  <p className="mt-2 text-xs leading-5 text-slate-500">
                    Make sure your account information is accurate so your
                    Smart Gym experience stays personalized.
                  </p>
                </div>

              </aside>

              {/* Personal Information */}
              <section className="glass-card soft-shadow rounded-3xl p-6 sm:p-8">

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-violet-600">
                      Personal information
                    </p>

                    <h2 className="mt-1 text-xl font-bold tracking-tight text-slate-900">
                      Profile details
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                      Update the information associated with your account.
                    </p>
                  </div>

                  <div className="w-11 h-11 rounded-2xl bg-slate-100 text-slate-500 flex items-center justify-center">
                    ⚙
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="mt-7 space-y-6">

                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Full name
                    </label>

                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                      disabled={saving}
                      className="w-full h-12 rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10 disabled:bg-slate-50 disabled:text-slate-400"
                    />

                    <p className="mt-2 text-xs text-slate-400">
                      This is the name displayed across your Smart Gym account.
                    </p>
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Email address
                    </label>

                    <div className="relative">
                      <input
                        type="email"
                        value={email}
                        disabled
                        className="w-full h-12 rounded-xl border border-slate-200 bg-slate-100 px-4 pr-24 text-sm text-slate-500 cursor-not-allowed"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        Locked
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Your email address cannot be changed from this page.
                    </p>
                  </div>

                  {/* Role */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-800 mb-2">
                      Account role
                    </label>

                    <div className="relative">
                      <input
                        type="text"
                        value={role}
                        disabled
                        className="w-full h-12 rounded-xl border border-slate-200 bg-slate-100 px-4 pr-24 text-sm text-slate-500 capitalize cursor-not-allowed"
                      />

                      <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg bg-white border border-slate-200 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                        System
                      </span>
                    </div>

                    <p className="mt-2 text-xs text-slate-400">
                      Your account role is managed by the system.
                    </p>
                  </div>

                  {/* Success Message */}
                  {message && (
                    <div className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3">
                      <div className="w-7 h-7 shrink-0 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                        ✓
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-emerald-800">
                          Success
                        </p>
                        <p className="text-xs text-emerald-700 mt-0.5">
                          {message}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Error Message */}
                  {error && (
                    <div className="flex items-start gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3">
                      <div className="w-7 h-7 shrink-0 rounded-lg bg-red-100 text-red-600 flex items-center justify-center text-sm">
                        !
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-red-800">
                          Unable to update profile
                        </p>
                        <p className="text-xs text-red-700 mt-0.5">
                          {error}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Save Button */}
                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <p className="text-xs text-slate-400">
                      Only your name can be edited here.
                    </p>

                    <button
                      type="submit"
                      disabled={saving}
                      className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-xl bg-violet-600 text-white text-sm font-semibold shadow-lg shadow-violet-200 hover:bg-violet-700 active:scale-[0.98] transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {saving ? (
                        <>
                          <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
                          Saving...
                        </>
                      ) : (
                        <>
                          <span>✓</span>
                          Save Changes
                        </>
                      )}
                    </button>
                  </div>

                </form>
              </section>
            </div>

            {/* Bottom Information */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 soft-shadow">
                <div className="w-9 h-9 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                  ◇
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  Membership
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Manage your active membership and plans from the membership
                  section.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 soft-shadow">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  ✓
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  Account secure
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Your account information is protected and managed through
                  the application.
                </p>
              </div>

              <div className="bg-white border border-slate-200/80 rounded-2xl p-5 soft-shadow">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  ✦
                </div>
                <h3 className="mt-4 text-sm font-semibold text-slate-900">
                  Smart Gym
                </h3>
                <p className="mt-1 text-xs leading-5 text-slate-500">
                  Keep your profile information current for a better fitness
                  management experience.
                </p>
              </div>

            </div>

          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;