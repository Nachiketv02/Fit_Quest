import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LearnMore from './pages/LearnMore';
import OtpVerification from './pages/OtpVerification';
import Classes from './pages/Classes';
import Trainers from './pages/Trainers';
import Schedule from './pages/Schedule';

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
          <Route path="/classes" element={<Classes />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/schedule" element={<Schedule />} />
        </Routes>
        <Footer />
      </div>
      <ToastContainer theme='light'/>
    </Router>
  );
}

export default App;