import { useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/authService";
import toast from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { useNavigate, useSearchParams } from "react-router-dom";

function AuthPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const gymImages = [
    "https://images.unsplash.com/photo-1534438327276-14e5300c3a48",
    "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b",
    "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e",
  ];

  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % gymImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const [isLogin, setIsLogin] = useState(searchParams.get("mode") === "login");

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  // Register input change
  const handleRegisterChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Login input change
  const handleLoginChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  // Register validation
  const validateRegister = () => {
    const newErrors = {};

    if (!registerData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (registerData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    if (!registerData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!registerData.password) {
      newErrors.password = "Password is required";
    } else if (registerData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    return newErrors;
  };

  // Login validation
  const validateLogin = () => {
    const newErrors = {};

    if (!loginData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!loginData.password) {
      newErrors.password = "Password is required";
    }

    return newErrors;
  };

  // Register submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateRegister();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await registerUser(registerData);

      toast.success(response.message || "Registration successful");

      setRegisterData({
        name: "",
        email: "",
        password: "",
      });

      setErrors({});
      setIsLogin(true);
    } catch (error) {
      toast.error(error.message || "Registration failed");
    }
  };

  // Login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLogin();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await loginUser(loginData);

      if (response.data.role === "ADMIN") {
        toast.error("Admin accounts cannot login from the user login page.");
        return;
      }
      login(response.data);

      toast.success(response.message || "Login successful!");

      setLoginData({
        email: "",
        password: "",
      });

      setErrors({});

      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message || "Login failed");
    }
  };

  // Switch to login
  const showLogin = () => {
    setIsLogin(true);
    setErrors({});
  };

  // Switch to register
  const showRegister = () => {
    setIsLogin(false);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#0b0b12] text-white flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-violet-600/15 blur-[130px]" />
        <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-[130px]" />
      </div>

      {/* Main card */}
      <div className="relative z-10 w-full max-w-6xl min-h-[680px] rounded-[28px] overflow-hidden border border-white/[0.08] bg-[#111118] shadow-2xl shadow-black/50 grid lg:grid-cols-[1.05fr_0.95fr]">
        {/* ================= LEFT SIDE ================= */}
        <div
          className="relative hidden lg:flex flex-col justify-between p-10 xl:p-14 bg-cover bg-center transition-all duration-1000"
          style={{
            backgroundImage: `
              linear-gradient(
                135deg,
                rgba(9, 9, 15, 0.88),
                rgba(32, 20, 62, 0.72)
              ),
              url(${gymImages[currentImage]})
            `,
          }}
        >
          {/* Image overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b12] via-transparent to-black/20" />

          <div className="relative z-10">
            {/* Logo */}
            <button
              type="button"
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
                <p className="text-[10px] text-slate-400 font-semibold tracking-[0.16em]">
                  FITNESS MANAGEMENT
                </p>
              </div>
            </button>
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/[0.06] backdrop-blur-sm text-violet-200 text-[10px] font-bold tracking-wider mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              SMART FITNESS EXPERIENCE
            </div>

            <h2 className="text-4xl xl:text-5xl font-black tracking-[-0.04em] leading-[1.08]">
              Build your
              <br />
              <span className="bg-gradient-to-r from-violet-300 to-indigo-300 bg-clip-text text-transparent">
                strongest self.
              </span>
            </h2>

            <p className="mt-5 max-w-md text-sm xl:text-base leading-7 text-slate-300/80">
              Manage your membership, track your fitness journey, make secure
              payments, and get personalized AI-powered nutrition guidance.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-3 gap-3 mt-8 max-w-lg">
              <MiniFeature icon="◇" text="Membership" />
              <MiniFeature icon="✦" text="AI Diet Plan" />
              <MiniFeature icon="▣" text="Payments" />
            </div>
          </div>

          {/* Bottom */}
          <div className="relative z-10 flex items-center justify-between">
            <p className="text-xs text-slate-400">
              Your fitness journey starts here.
            </p>

            <div className="flex items-center gap-1.5">
              {gymImages.map((_, index) => (
                <span
                  key={index}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    index === currentImage
                      ? "w-6 bg-violet-400"
                      : "w-1.5 bg-white/30"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center justify-center bg-[#111118] p-6 sm:p-10 lg:p-12">
          <div className="w-full max-w-md">
            {/* Mobile logo */}
            <div className="lg:hidden mb-8">
              <button
                type="button"
                onClick={() => navigate("/")}
                className="flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-violet-950/40">
                  <span className="text-xl font-black">S</span>
                </div>

                <div className="text-left">
                  <h1 className="text-[17px] font-bold">Smart Gym</h1>
                  <p className="text-[10px] text-slate-500 tracking-[0.16em]">
                    FITNESS MANAGEMENT
                  </p>
                </div>
              </button>
            </div>

            {/* Heading */}
            <div>
              <div className="w-10 h-1 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 mb-5" />

              <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
                {isLogin ? "Welcome back." : "Create your account."}
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                {isLogin
                  ? "Login to continue your fitness journey."
                  : "Join Smart Gym and start building a stronger you."}
              </p>
            </div>

            {/* ================= REGISTER ================= */}
            {!isLogin && (
              <form onSubmit={handleRegisterSubmit} className="mt-8 space-y-5">
                <AuthInput
                  label="Full Name"
                  type="text"
                  name="name"
                  value={registerData.name}
                  onChange={handleRegisterChange}
                  placeholder="Enter your full name"
                  error={errors.name}
                />

                <AuthInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={registerData.email}
                  onChange={handleRegisterChange}
                  placeholder="Enter your email"
                  error={errors.email}
                />

                <AuthInput
                  label="Password"
                  type="password"
                  name="password"
                  value={registerData.password}
                  onChange={handleRegisterChange}
                  placeholder="Create a password"
                  error={errors.password}
                />

                <button
                  type="submit"
                  className="group w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-violet-950/30 hover:from-violet-500 hover:to-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Create Account
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.07]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-[#111118] text-[10px] uppercase tracking-wider text-slate-600">
                      Already a member?
                    </span>
                  </div>
                </div>

                <p className="text-center text-sm text-slate-500">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={showLogin}
                    className="font-semibold text-violet-400 hover:text-violet-300 transition"
                  >
                    Login
                  </button>
                </p>
              </form>
            )}

            {/* ================= LOGIN ================= */}
            {isLogin && (
              <form onSubmit={handleLoginSubmit} className="mt-8 space-y-5">
                <AuthInput
                  label="Email Address"
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleLoginChange}
                  placeholder="Enter your email"
                  error={errors.email}
                />

                <AuthInput
                  label="Password"
                  type="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  error={errors.password}
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-600">Secure login</span>

                  <span className="flex items-center gap-1.5 text-emerald-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Protected
                  </span>
                </div>

                <button
                  type="submit"
                  className="group w-full h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-bold shadow-lg shadow-violet-950/30 hover:from-violet-500 hover:to-indigo-500 hover:-translate-y-0.5 transition-all duration-200"
                >
                  Login to Smart Gym
                  <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-white/[0.07]" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="px-3 bg-[#111118] text-[10px] uppercase tracking-wider text-slate-600">
                      New to Smart Gym?
                    </span>
                  </div>
                </div>

                <p className="text-center text-sm text-slate-500">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={showRegister}
                    className="font-semibold text-violet-400 hover:text-violet-300 transition"
                  >
                    Sign Up
                  </button>
                </p>
              </form>
            )}

            {/* Footer */}
            <p className="text-center text-[10px] text-slate-700 mt-8">
              By continuing, you agree to use Smart Gym responsibly.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ================= COMPONENTS ================= */

function AuthInput({ label, type, name, value, onChange, placeholder, error }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-300 mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full h-12 px-4 rounded-xl bg-white/[0.035] border text-sm text-white placeholder:text-slate-700 outline-none transition-all ${
          error
            ? "border-red-500/60 focus:border-red-500"
            : "border-white/[0.08] focus:border-violet-500/70 focus:bg-white/[0.05]"
        }`}
      />

      {error && <p className="mt-1.5 text-xs text-red-400">{error}</p>}
    </div>
  );
}

function MiniFeature({ icon, text }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 backdrop-blur-sm px-3 py-3">
      <div className="text-violet-300 text-sm mb-1">{icon}</div>

      <p className="text-[10px] text-slate-300 font-medium">{text}</p>
    </div>
  );
}

export default AuthPage;
