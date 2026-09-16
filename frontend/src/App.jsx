import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/UserDashboard";
import Landing from "./pages/Landing";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./context/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import MembershipPlans from "./pages/MembershipPlans";
import Membership from "./pages/Membership";
import { useEffect } from "react";
import PaymentPage from "./pages/PaymentPage";
import Profile from "./pages/Profile";
import DietPlan from "./pages/DietPlan";
import AdminLogin from "./pages/Admin/AdminLogin";

function App() {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />

          <Route path="/auth" element={<AuthPage />} />

          <Route path="/admin/login" element={<AdminLogin/>}/>

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/membership-plans"
            element={
              <ProtectedRoute>
                <MembershipPlans />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-membership"
            element={
              <ProtectedRoute>
                <Membership />
              </ProtectedRoute>
            }
          />

          <Route
            path="/payment"
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/diet-plan"
            element={
              <ProtectedRoute>
                <DietPlan />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
