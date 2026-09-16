
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/20 blur-[120px]" />
        <div className="absolute top-[45%] -left-40 w-[450px] h-[450px] rounded-full bg-indigo-600/10 blur-[120px]" />
        <div className="absolute bottom-0 right-[20%] w-[300px] h-[300px] rounded-full bg-purple-500/10 blur-[100px]" />
      </div>

      {/* Navbar */}
      <header className="relative z-10 px-6 sm:px-10 lg:px-16 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-3 group"
          >
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-950/40 group-hover:scale-105 transition-transform">
              <span className="text-xl font-black">S</span>
            </div>

            <div className="text-left">
              <h1 className="text-[17px] font-bold tracking-tight">
                Smart Gym
              </h1>
              <p className="text-[10px] text-slate-500 font-semibold tracking-[0.16em]">
                FITNESS MANAGEMENT
              </p>
            </div>
          </button>

          {/* Navbar buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/auth?mode=login")}
              className="hidden sm:block px-4 py-2.5 text-sm font-medium text-slate-300 hover:text-white transition"
            >
              Login
            </button>

            <button
              onClick={() => navigate("/auth?mode=register")}
              className="px-4 sm:px-5 py-2.5 rounded-xl bg-white text-slate-900 text-sm font-semibold hover:bg-slate-100 transition shadow-lg shadow-black/20"
            >
              Get Started
            </button>
          </div>
        </div>
      </header>

      {/* Hero */}
      <main className="relative z-10">
        <section className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-24 lg:pt-28 pb-20">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-violet-400/20 bg-violet-500/[0.08] text-violet-300 text-xs font-semibold mb-7">
              <span className="w-2 h-2 rounded-full bg-violet-400 shadow-lg shadow-violet-400/50" />
              YOUR FITNESS. YOUR JOURNEY. YOUR RESULTS.
            </div>

            {/* Main heading */}
            <h2 className="text-4xl sm:text-5xl lg:text-7xl font-black tracking-[-0.04em] leading-[1.05]">
              Train smarter.
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Live stronger.
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-2xl mx-auto mt-7 text-base sm:text-lg leading-8 text-slate-400">
              Smart Gym brings your memberships, payments, personalized AI
              nutrition plans, and fitness journey together in one simple
              platform.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row justify-center gap-3 mt-9">
              <button
                onClick={() => navigate("/auth?mode=register")}
                className="group px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-xl shadow-violet-950/40 hover:from-violet-500 hover:to-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
              >
                Start Your Journey
                <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                  →
                </span>
              </button>

              <button
                onClick={() => navigate("/auth?mode=login")}
                className="px-7 py-3.5 rounded-xl border border-white/10 bg-white/[0.04] text-slate-200 text-sm font-semibold hover:bg-white/[0.08] hover:border-white/20 transition-all"
              >
                I Already Have an Account
              </button>
            </div>
          </div>

          {/* Feature cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-5xl mx-auto mt-20">
            <FeatureCard
              icon="◇"
              title="Smart Membership"
              description="Choose a plan that fits your fitness goals and manage it easily."
            />

            <FeatureCard
              icon="✦"
              title="AI Diet Plans"
              description="Get personalized nutrition guidance based on your fitness goals."
            />

            <FeatureCard
              icon="▣"
              title="Easy Payments"
              description="Securely purchase and manage your gym membership in one place."
            />
          </div>

          {/* Bottom stats */}
          <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-white/[0.07]">
            <div className="grid grid-cols-3 divide-x divide-white/[0.08]">
              <Stat value="24/7" label="Access" />
              <Stat value="AI" label="Powered" />
              <Stat value="100%" label="Personalized" />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-slate-600">
            © 2026 Smart Gym Management
          </p>

          <p className="text-xs text-slate-600">
            Built for a smarter fitness journey
          </p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.035] p-5 hover:bg-white/[0.06] hover:border-violet-400/20 transition-all duration-200">
      <div className="w-11 h-11 rounded-xl bg-violet-500/10 text-violet-400 flex items-center justify-center text-lg mb-4 group-hover:bg-violet-500/15 transition">
        {icon}
      </div>

      <h3 className="text-sm font-bold text-white">
        {title}
      </h3>

      <p className="text-xs leading-5 text-slate-500 mt-2">
        {description}
      </p>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center px-4">
      <p className="text-xl sm:text-2xl font-black text-white">
        {value}
      </p>

      <p className="text-[10px] sm:text-xs text-slate-600 uppercase tracking-wider mt-1">
        {label}
      </p>
    </div>
  );
}

export default Landing;

