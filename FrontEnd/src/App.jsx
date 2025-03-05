import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LearnMore from "./pages/LearnMore";
import OtpVerification from "./pages/OtpVerification";
import Classes from "./pages/Classes";
import Trainers from "./pages/Trainers";
import Schedule from "./pages/Schedule";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ProtectedRoute from "./components/ProtectedRoute";
import Subscription from "./pages/Subscription";
import Profile from "./pages/Profile";

//admin side
import Dashboard from "./pages/Admin/Dashboard";
import Members from "./pages/Admin/Members";
import AdminClasses from "./pages/Admin/AdminClasses";
import InstructorsPage from "./pages/Admin/InstructorsPage";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/learnmore" element={<LearnMore />} />
          <Route path="/verify" element={<OtpVerification />} />
          <Route
            path="/classes"
            element={
              <ProtectedRoute>
                <Classes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/trainers"
            element={
              <ProtectedRoute>
                <Trainers />
              </ProtectedRoute>
            }
          />
          {/* <Route
            path="/schedule"
            element={
              <ProtectedRoute>
                <Schedule />
              </ProtectedRoute>
            }
          /> */}
          <Route
            path="/subscription"
            element={
              <ProtectedRoute>
                <Subscription />
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
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />

          {/* admin side */}
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/members" element={<Members />} />
          <Route path="/admin/classes" element={<AdminClasses />} />
          <Route path="/admin/instructors" element={<InstructorsPage />} />

        </Routes>
        <Footer />
      </div>
      <ToastContainer theme="light" />
    </Router>
  );
}

export default App;
