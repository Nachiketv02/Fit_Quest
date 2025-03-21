import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiUser,
  FiCheck,
  FiX,
} from "react-icons/fi";
import { X, AlertCircle } from "lucide-react";

import {
  cancelledclasses,
  pastClasses,
  upcomingClasses,
  cancelBooking,
} from "../services/User/api";

function UserClasses() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [classToCancel, setClassToCancel] = useState(null);

  const [bookedClasses, setBookedClasses] = useState({
    upcoming: [],
    past: [],
    cancelled: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const closeModal = () => {
    setIsModalClosing(true);
    setTimeout(() => {
      setShowCancelModal(false);
      setIsModalClosing(false);
      setClassToCancel(null);
    }, 200);
  };

  const handleCancel = async (classesId) => {
    try {
      setLoading(true);
      await cancelBooking({ classesId });
      // Refresh the booked classes
      const upcoming = await upcomingClasses();
      const past = await pastClasses();
      const cancelled = await cancelledclasses();
      setBookedClasses({
        upcoming,
        past,
        cancelled,
      });
      closeModal();
    } catch (error) {
      setError(error.response?.data.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchBookedClasses = async () => {
      try {
        const upcoming = await upcomingClasses();
        const past = await pastClasses();
        const cancelled = await cancelledclasses();
        setBookedClasses({
          upcoming,
          past,
          cancelled,
        });
      } catch (error) {
        console.error("Error fetching booked classes:", error);
      }
    };
    fetchBookedClasses();
  }, []);

  const getStatusColor = (status) => {
    const colors = {
      confirmed: "bg-green-100 text-green-800",
      completed: "bg-blue-100 text-blue-800",
      cancelled: "bg-red-100 text-red-800",
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  const getCategoryColor = (category) => {
    const colors = {
      cardio: "bg-red-500",
      strength: "bg-blue-500",
      yoga: "bg-green-500",
      hiit: "bg-purple-500",
      dance: "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  const getStatus = () => {
    if (activeTab === "upcoming") {
      return "confirmed";
    } else if (activeTab === "past") {
      return "completed";
    } else {
      return "cancelled";
    }
  };

  return (
    <div className="pt-20 bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-gray-900 to-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-gradient">Classes</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Track and manage your booked classes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Classes Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Upcoming Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {bookedClasses.upcoming.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <FiCalendar className="w-6 h-6 text-primary" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Completed Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {bookedClasses.past.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <FiCheck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl p-6 shadow-md"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Cancelled Classes</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {bookedClasses.cancelled.length}
                  </h3>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                  <FiX className="w-6 h-6 text-red-600" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-md mb-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6" aria-label="Tabs">
                {["upcoming", "past", "cancelled"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? "border-primary text-primary"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Class Cards */}
          <div className="space-y-6">
            {bookedClasses[activeTab].map((classItem) => (
              <motion.div
                key={classItem._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="md:flex md:items-center md:justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center">
                        <div
                          className={`w-3 h-3 rounded-full ${getCategoryColor(
                            classItem.category
                          )} mr-3`}
                        ></div>
                        <h2 className="text-xl font-bold text-gray-900 truncate">
                          {classItem.className}
                        </h2>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500">
                        <FiCalendar className="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400" />
                        <span>{classItem.startDate}</span>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          getStatus()
                        )}`}
                      >
                        {getStatus()}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <dl className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiClock className="mr-2" />
                          Time
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {classItem.times} - {classItem.duration}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiMapPin className="mr-2" />
                          Location
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900">
                          {classItem.room}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-sm font-medium text-gray-500 flex items-center">
                          <FiUser className="mr-2" />
                          Instructor
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 flex items-center">
                          <img
                            src={classItem.instructor.image}
                            alt={classItem.instructor.fullName}
                            className="w-6 h-6 rounded-full mr-2"
                          />
                          {classItem.instructor.fullName}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {getStatus() === "confirmed" && (
                    <div className="mt-6 border-t border-gray-200 pt-6 flex justify-between items-center">
                      <div className="text-sm text-gray-500">
                        {classItem.capacity - classItem.enrolled} spots
                        remaining
                      </div>
                      <motion.button
                        onClick={() => {
                          setShowCancelModal(true);
                          setClassToCancel(classItem);
                        }}
                        disabled={loading}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                      >
                        Cancel Booking
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}

            {bookedClasses[activeTab].length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <FiCalendar className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No Classes Found
                </h3>
                <p className="text-gray-500">
                  You don't have any {activeTab} classes.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      {showCancelModal && (
        <div
          className={`fixed inset-0 bg-black transition-opacity duration-200 flex items-center justify-center z-50 p-4
      ${isModalClosing ? "bg-opacity-0" : "bg-opacity-50"}`}
          onClick={closeModal}
        >
          <div
            className={`bg-white rounded-lg max-w-md w-full p-6 shadow-xl transform transition-all duration-200
        ${isModalClosing ? "scale-95 opacity-0" : "scale-100 opacity-100"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-900">
                Confirm Cancellation
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <p className="text-gray-600">
                Are you sure you want to cancel your booking for{" "}
                <span className="font-semibold text-gray-900">
                  {classToCancel?.className}
                </span>
                ? This action cannot be undone.
              </p>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={async () => {
                  await handleCancel(classToCancel._id); // Cancel the class
                  closeModal(); // Close the modal
                }}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Confirm Cancellation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserClasses;
