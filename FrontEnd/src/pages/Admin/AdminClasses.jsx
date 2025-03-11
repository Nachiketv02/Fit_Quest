import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiFilter,
  FiEdit,
  FiTrash2,
  FiPlus,
  FiX,
  FiMapPin,
  FiCheck,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiClock,
  FiUser,
} from "react-icons/fi";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import {
  getClasses,
  getAllInstructors,
  addClass,
  updateClass,
  deleteClass,
} from "../../services/Admin/api";
import { toast } from "react-toastify";

function AdminClasses() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [classToDelete, setClassToDelete] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [classToEdit, setClassToEdit] = useState(null);
  const [newClass, setNewClass] = useState({
    name: "",
    category: "cardio",
    instructor: "",
    startDate: null,
    time: "",
    duration: "",
    capacity: "",
    room: "",
    description: "",
  });

  const [classesData, setClassesData] = useState([]);
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const response = await getClasses();
      setClassesData(response.classes);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchInstructors = async () => {
    try {
      setLoading(true);
      const response = await getAllInstructors();
      setInstructors(response.instructors);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
    fetchInstructors();
  }, []);

  // Filter and search classes
  const filteredClasses = classesData.filter((classItem) => {
    const matchesSearch =
      classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
      classItem.instructor.fullName
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
    const matchesCategory =
      filterCategory === "all" || classItem.category === filterCategory;

    return matchesSearch && matchesCategory;
  });

  // Pagination
  const itemsPerPage = 5;
  const totalPages = Math.ceil(filteredClasses.length / itemsPerPage);
  const paginatedClasses = filteredClasses.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDeleteClick = (classItem) => {
    setClassToDelete(classItem);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      setLoading(true);
      await deleteClass(classToDelete._id); // Call the delete API with the class ID
      setClassesData((prev) =>
        prev.filter((item) => item._id !== classToDelete._id)
      ); // Update local state
      toast.success("Class deleted successfully"); // Show success message
    } catch (error) {
      setError(error.message); // Set the error state
      console.error("Error deleting class:", error); // Log the error
    } finally {
      setLoading(false); // Reset loading state
      setShowDeleteModal(false); // Close the modal
      setClassToDelete(null); // Reset the class to delete
    }
  };

  const handleAddClass = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      setLoading(true);
      // Prepare the class data to be sent to the API
      const classData = {
        className: newClass.name,
        category: newClass.category,
        instructor: newClass.instructor, // This should be the instructor's ID
        startDate: newClass.startDate.toISOString().split("T")[0], // Ensure this is in the correct format
        times: newClass.time,
        duration: newClass.duration,
        capacity: newClass.capacity,
        room: newClass.room,
        description: newClass.description,
      };

      // Call the API to add the class
      const response = await addClass(classData);

      // Update local state with the new class
      setClassesData((prev) => [...prev, response.newClass]); // Assuming response contains the new class

      // Close the modal and reset the form
      setShowAddModal(false);
      setNewClass({
        name: "",
        category: "cardio",
        instructor: "",
        startDate: null,
        time: "",
        duration: "",
        capacity: "",
        room: "",
        description: "",
      });

      // Optionally show a success message
      toast.success("Class added successfully");
    } catch (error) {
      setError(error.message); // Set the error state
      console.error("Error adding class:", error); // Log the error
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleEditClass = (classItem) => {
    if (!classItem) {
      console.error("classItem is undefined");
      return; // Exit if classItem is undefined
    }
    console.log(classItem); // Log the classItem to see its structure
    setClassToEdit({
      ...classItem,
      className: classItem.className,
      startDate: new Date(classItem.startDate.split("T")[0]),
      time: classItem.times,
    });
    setShowEditModal(true);
  };
  
  const handleUpdateClass = async (e) => {
    e.preventDefault();
    if (!classToEdit) {
      console.error("classToEdit is undefined");
      return; // Exit if classToEdit is undefined
    }
    try {
      setLoading(true);
      const updatedData = {
        className: classToEdit.className,
        category: classToEdit.category,
        instructor: classToEdit.instructor,
        startDate: classToEdit.startDate.toISOString().split("T")[0],
        times: classToEdit.time,
        duration: classToEdit.duration,
        capacity: classToEdit.capacity,
        room: classToEdit.room,
        description: classToEdit.description,
      };
  
      const response = await updateClass(classToEdit._id, updatedData);
      setClassesData((prev) =>
        prev.map((cls) =>
          cls._id === classToEdit._id ? response.classToUpdate : cls
        )
      );
      setShowEditModal(false);
      toast.success("Class updated successfully");
    } catch (error) {
      setError(error.message);
      console.error("Error updating class:", error);
    } finally {
      setLoading(false);
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      cardio: "bg-red-500",
      strength: "bg-blue-500",
      "yoga & flexibility": "bg-green-500",
      hiit: "bg-purple-500",
      dance: "bg-pink-500",
    };
    return colors[category] || "bg-gray-500";
  };

  //Date formate
  const convertDateFormat = (date) => {
    const [year, month, day] = date.split("-");
    return `${day}-${month}-${year}`;
  };

  //get day name
  const getDayName = (dateString) => {
    const date = new Date(dateString);
    const options = { weekday: "long" };
    return date.toLocaleDateString("en-US", options);
  };

  // Get category text color
  const getCategoryTextColor = (category) => {
    const colors = {
      cardio: "text-red-800 bg-red-100",
      strength: "text-blue-800 bg-blue-100",
      yoga: "text-green-800 bg-green-100",
      hiit: "text-purple-800 bg-purple-100",
      dance: "text-pink-800 bg-pink-100",
    };
    return colors[category] || "text-gray-800 bg-gray-100";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <AdminSidebar isMobile={false} isOpen={true} />
      <AdminSidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Classes"
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-800">Classes</h1>
                  <p className="text-gray-600">Manage your gym classes</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowAddModal(true)}
                  className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
                >
                  <FiPlus className="mr-2" />
                  Add Class
                </motion.button>
              </div>
            </div>

            {/* Filters and Search */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search classes..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiFilter className="text-gray-400" />
                  </div>
                  <select
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="cardio">Cardio</option>
                    <option value="strength">Strength</option>
                    <option value="yoga & flexibility">
                      Yoga & Flexibility
                    </option>
                    <option value="hiit">HIIT</option>
                    <option value="dance">Dance</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Classes Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Class
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Schedule
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Enrollment
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedClasses.map((classItem) => (
                      <tr key={classItem._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="flex items-start">
                            <div
                              className={`w-3 h-3 rounded-full ${getCategoryColor(
                                classItem.category.toLowerCase()
                              )} mt-1.5 mr-3 flex-shrink-0`}
                            ></div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {classItem.className}
                              </div>
                              <div className="text-xs text-gray-500 mt-1">
                                <span
                                  className={`px-2 py-0.5 rounded-full ${getCategoryTextColor(
                                    classItem.category.toLowerCase()
                                  )}`}
                                >
                                  {classItem.category.charAt(0).toUpperCase() +
                                    classItem.category.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900 flex items-center">
                            <FiClock className="mr-1 text-gray-400" />
                            {classItem.times}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiCalendar className="mr-1 text-gray-400" />
                            {convertDateFormat(
                              classItem.startDate.split("T")[0]
                            )}{" "}
                            - {getDayName(classItem.startDate.split("T")[0])}
                          </div>
                          <div className="text-xs text-gray-500 mt-1 flex items-center">
                            <FiMapPin className="mr-1 text-gray-400" />
                            {classItem.room}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img
                                className="h-8 w-8 rounded-full object-cover"
                                src={classItem.instructor?.image}
                                alt={classItem.instructor?.fullName}
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">
                                {classItem.instructor?.fullName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className="text-sm text-gray-900 mr-2">
                              {classItem.enrolled}/{classItem.capacity}
                            </span>
                            <div className="w-24 bg-gray-200 rounded-full h-2">
                              <div
                                className={`rounded-full h-2 ${
                                  classItem.enrolled / classItem.capacity > 0.8
                                    ? "bg-red-500"
                                    : classItem.enrolled / classItem.capacity >
                                      0.5
                                    ? "bg-yellow-500"
                                    : "bg-green-500"
                                }`}
                                style={{
                                  width: `${
                                    (classItem.enrolled / classItem.capacity) *
                                    100
                                  }%`,
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                            onClick={() => handleEditClass(classItem)}
                          >
                            <FiEdit />
                          </button>
                          <button
                            className="text-red-600 hover:text-red-900"
                            onClick={() => handleDeleteClick(classItem)}
                          >
                            <FiTrash2 />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
                  <div className="flex-1 flex justify-between sm:hidden">
                    <button
                      onClick={() =>
                        handlePageChange(Math.max(1, currentPage - 1))
                      }
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === 1
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={() =>
                        handlePageChange(Math.min(totalPages, currentPage + 1))
                      }
                      disabled={currentPage === totalPages}
                      className={`ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md ${
                        currentPage === totalPages
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Next
                    </button>
                  </div>
                  <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-gray-700">
                        Showing{" "}
                        <span className="font-medium">
                          {(currentPage - 1) * itemsPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            currentPage * itemsPerPage,
                            filteredClasses.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {filteredClasses.length}
                        </span>{" "}
                        results
                      </p>
                    </div>
                    <div>
                      <nav
                        className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                        aria-label="Pagination"
                      >
                        <button
                          onClick={() =>
                            handlePageChange(Math.max(1, currentPage - 1))
                          }
                          disabled={currentPage === 1}
                          className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === 1
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Previous</span>
                          <FiChevronLeft className="h-5 w-5" />
                        </button>

                        {[...Array(totalPages)].map((_, i) => (
                          <button
                            key={i}
                            onClick={() => handlePageChange(i + 1)}
                            className={`relative inline-flex items-center px-4 py-2 border ${
                              currentPage === i + 1
                                ? "z-10 bg-primary border-primary text-white"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            } text-sm font-medium`}
                          >
                            {i + 1}
                          </button>
                        ))}

                        <button
                          onClick={() =>
                            handlePageChange(
                              Math.min(totalPages, currentPage + 1)
                            )
                          }
                          disabled={currentPage === totalPages}
                          className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                            currentPage === totalPages
                              ? "text-gray-300 cursor-not-allowed"
                              : "text-gray-500 hover:bg-gray-50"
                          }`}
                        >
                          <span className="sr-only">Next</span>
                          <FiChevronRight className="h-5 w-5" />
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-md w-full p-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <h3 className="text-lg font-bold text-gray-900 mb-4">
              Confirm Delete
            </h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete {classToDelete?.name}? This action
              cannot be undone.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Add Class Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Add New Class</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleAddClass}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Class Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={newClass.name}
                  onChange={(e) =>
                    setNewClass({ ...newClass, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter class name"
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Category
                </label>
                <select
                  id="category"
                  value={newClass.category}
                  onChange={(e) =>
                    setNewClass({ ...newClass, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="yoga & flexibility">Yoga & flexibility</option>
                  <option value="hiit">HIIT</option>
                  <option value="dance">Dance</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="instructor"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Instructor
                </label>
                <select
                  id="instructor"
                  value={newClass.instructor}
                  onChange={(e) =>
                    setNewClass({ ...newClass, instructor: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="" disabled>
                    Select Instructor
                  </option>
                  {instructors.map((instructor) => (
                    <option key={instructor._id} value={instructor._id}>
                      {instructor.fullName}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label
                  htmlFor="startDate"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Start Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={newClass.startDate}
                    onChange={(date) =>
                      setNewClass({ ...newClass, startDate: date })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    dateFormat="yyyy-MM-dd"
                    placeholderText="Select start date"
                    minDate={new Date()}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    value={newClass.time}
                    onChange={(e) =>
                      setNewClass({ ...newClass, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 06:00 - 06:45"
                  />
                </div>

                <div>
                  <label
                    htmlFor="duration"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Duration (minutes)
                  </label>
                  <input
                    type="text"
                    id="duration"
                    value={newClass.duration}
                    onChange={(e) =>
                      setNewClass({ ...newClass, duration: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 45"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    id="capacity"
                    value={newClass.capacity}
                    onChange={(e) =>
                      setNewClass({ ...newClass, capacity: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. 20"
                  />
                </div>

                <div>
                  <label
                    htmlFor="room"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Room
                  </label>
                  <input
                    type="text"
                    id="room"
                    value={newClass.room}
                    onChange={(e) =>
                      setNewClass({ ...newClass, room: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="e.g. Studio A"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows="3"
                  value={newClass.description}
                  onChange={(e) =>
                    setNewClass({ ...newClass, description: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter class description"
                ></textarea>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <FiCheck className="mr-2" />
                  Add Class
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showEditModal && classToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-900">Edit Class</h3>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <FiX size={20} />
              </button>
            </div>

            <form className="space-y-4" onSubmit={handleUpdateClass}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Class Name
                </label>
                <input
                  type="text"
                  value={classToEdit.className}
                  onChange={(e) =>
                    setClassToEdit({ ...classToEdit, className: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  value={classToEdit.category}
                  onChange={(e) =>
                    setClassToEdit({ ...classToEdit, category: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="cardio">Cardio</option>
                  <option value="strength">Strength</option>
                  <option value="yoga & flexibility">Yoga & Flexibility</option>
                  <option value="hiit">HIIT</option>
                  <option value="dance">Dance</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instructor
                </label>
                <select
                  value={classToEdit.instructor}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      instructor: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                >
                  <option value="" disabled>
                    Select Instructor
                  </option>
                  {instructors.map((inst) => (
                    <option key={inst._id} value={inst._id}>
                      {inst.fullName}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Date
                </label>
                <div className="relative">
                  <DatePicker
                    selected={classToEdit.startDate}
                    onChange={(date) =>
                      setClassToEdit({ ...classToEdit, startDate: date })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    dateFormat="yyyy-MM-dd"
                    minDate={new Date()}
                  />
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                    <FiCalendar className="text-gray-400" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <input
                    type="text"
                    value={classToEdit.time}
                    onChange={(e) =>
                      setClassToEdit({ ...classToEdit, time: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g. 06:00 - 06:45"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={classToEdit.duration}
                    onChange={(e) =>
                      setClassToEdit({
                        ...classToEdit,
                        duration: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Capacity
                  </label>
                  <input
                    type="number"
                    value={classToEdit.capacity}
                    onChange={(e) =>
                      setClassToEdit({
                        ...classToEdit,
                        capacity: e.target.value,
                      })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Room
                  </label>
                  <input
                    type="text"
                    value={classToEdit.room}
                    onChange={(e) =>
                      setClassToEdit({ ...classToEdit, room: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows="3"
                  value={classToEdit.description}
                  onChange={(e) =>
                    setClassToEdit({
                      ...classToEdit,
                      description: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center"
                >
                  <FiCheck className="mr-2" />
                  Update Class
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default AdminClasses;
