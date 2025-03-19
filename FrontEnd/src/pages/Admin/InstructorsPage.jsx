import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  X,
  CheckCircle,
  XCircle,
  User,
  Mail,
  Phone,
  Award,
} from "lucide-react";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiActivity,
  FiAlertTriangle,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import {
  getInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
  searchInstructors,
  getAllTrainerRequests,
  approveTrainerRequest,
  rejectTrainerRequest,
} from "../../services/Admin/api";
import debounce from "lodash/debounce";
import { toast } from "react-toastify";

function InstructorsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [instructors, setInstructors] = useState([]);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, id: null });
  const [editModal, setEditModal] = useState({
    isOpen: false,
    instructor: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showRequests, setShowRequests] = useState(false);
  const [requests, setRequests] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const instructorsPerPage = 5;

  useEffect(() => {
    fetchInstructors();
    fetchRequests();
  }, [searchQuery, currentPage]);

  const fetchInstructors = async () => {
    setLoading(true);
    setError(null);
    try {
      let data;
      if (searchQuery) {
        const searchResult = await searchInstructors(
          searchQuery,
          currentPage,
          instructorsPerPage
        );
        data = searchResult.instructors;
        setTotalPages(Math.ceil(searchResult.total / instructorsPerPage));
      } else {
        const result = await getInstructors(currentPage, instructorsPerPage);
        data = result.instructors;
        setTotalPages(result.pagination.totalPages);
      }
      setInstructors(data);
    } catch (err) {
      setError(err.message || "Failed to fetch instructors.");
      console.error("Fetch instructors error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleApproveRequest = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await approveTrainerRequest(id);
      toast.success('Request approved successfully!');
      fetchRequests();
    } catch (err) {
      toast.error('Failed to approve trainer request.');
      setError(err.message || "Failed to approve trainer request.");
      console.error("Approve trainer request error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRejectRequest = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await rejectTrainerRequest(id);
      toast.success('Request rejected successfully!');
      fetchRequests();
    } catch (err) {
      toast.error('Failed to reject trainer request.');
      setError(err.message || "Failed to reject trainer request.");
      console.error("Reject trainer request error:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchRequests = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAllTrainerRequests();
      setRequests(result.trainerRequests);
    } catch (err) {
      setError(err.message || "Failed to fetch trainer requests.");
      console.error("Fetch trainer requests error:", err);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (showRequests) {
      fetchRequests();
    }
  }, [showRequests]);

  const handleDeleteInstructor = async () => {
    if (!deleteModal.id) return;

    try {
      await deleteInstructor(deleteModal.id);
      setInstructors(instructors.filter((inst) => inst._id !== deleteModal.id));
      setDeleteModal({ isOpen: false, id: null });
    } catch (error) {
      console.error("Error deleting instructor:", error);
    }
  };

  const InstructorModal = ({ isOpen, onClose }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      specialties: [],
      image: "",
      experience: "",
      certifications: "",
    });

    const handleAddInstructor = async (e) => {
      e.preventDefault();
      const newInstructor = {
        fullName: formData.fullName,
        title: formData.title,
        email: formData.email,
        phone: formData.phone,
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        image: formData.image,
        experience: formData.experience,
        certifications: formData.certifications,
      };

      try {
        const data = await addInstructor(newInstructor);
        if (data && data._id) {
          setInstructors((prevInstructors) => [...prevInstructors, data]);
          setFormData({
            fullName: "",
            title: "",
            email: "",
            phone: "",
            specialties: [],
            image: "",
            experience: "",
            certifications: "",
          });
          onClose();
          toast.success("Instructor added successfully");
        } else {
          console.error("Invalid data format received from API");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-x-0 top-[10%] mx-auto max-w-2xl bg-white rounded-xl shadow-2xl z-50 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Add New Instructor
          </h2>

          <form className="space-y-6" onSubmit={handleAddInstructor}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Shraddha Maheshwari"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Title
                  </option>
                  <option value="strength">Strength & Conditioning</option>
                  <option value="cardio">Cardio</option>
                  <option value="yoga & flexibility">Yoga & Flexibility</option>
                  <option value="hiit">HIIT</option>
                  <option value="dance">Dance</option>
                  <option value="nutrition">Nutrition</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="shradha.maheshwari@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="+91 9645873214"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialties
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Yoga, Cardio, Nutrition"
                  value={formData.specialties}
                  onChange={(e) =>
                    setFormData({ ...formData, specialties: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="5 years of experience"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Certifications
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="2"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData({ ...formData, certifications: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Add Instructor
              </button>
            </div>
          </form>
        </motion.div>
      </>
    );
  };

  const EditInstructorModal = ({ isOpen, onClose, instructor }) => {
    const [formData, setFormData] = useState({
      fullName: "",
      title: "",
      email: "",
      phone: "",
      specialties: [],
      image: "",
      experience: "",
      certifications: "",
    });

    useEffect(() => {
      if (instructor) {
        setFormData({
          fullName: instructor.fullName,
          title: instructor.title,
          email: instructor.email,
          phone: instructor.phone,
          specialties: instructor.specialties.join(", "),
          image: instructor.image,
          experience: instructor.experience,
          certifications: instructor.certifications,
        });
      }
    }, [instructor]);

    const handleEditInstructor = async (e) => {
      e.preventDefault();
      const updatedInstructor = {
        fullName: formData.fullName,
        title: formData.title,
        email: formData.email,
        phone: formData.phone,
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        image: formData.image,
        experience: formData.experience,
        certifications: formData.certifications,
      };

      try {
        const data = await updateInstructor(instructor._id, updatedInstructor);

        if (data && data._id) {
          setInstructors((prevInstructors) =>
            prevInstructors.map((inst) =>
              inst._id === instructor._id ? data : inst
            )
          );
          toast.success("Instructor updated successfully");
          onClose();
        } else {
          console.error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error updating instructor:", error);
      }
    };

    if (!isOpen) return null;

    return (
      <>
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed inset-x-0 top-[10%] mx-auto max-w-2xl bg-white rounded-xl shadow-2xl z-50 p-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Edit Instructor
          </h2>

          <form className="space-y-6" onSubmit={handleEditInstructor}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Shraddha Maheshwari"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <select
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                >
                  <option value="" disabled>
                    Select Title
                  </option>
                  <option value="strength">Strength & Conditioning</option>
                  <option value="cardio">Cardio</option>
                  <option value="yoga & flexibility">Yoga & Flexibility</option>
                  <option value="hiit">HIIT</option>
                  <option value="dance">Dance</option>
                  <option value="nutrition">Nutrition</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="shradha.maheshwari@example.com"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="+91 9645873214"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialties
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="Yoga, Cardio, Nutrition"
                  value={formData.specialties}
                  onChange={(e) =>
                    setFormData({ ...formData, specialties: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Profile Image URL
                </label>
                <input
                  type="url"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) =>
                    setFormData({ ...formData, image: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Experience
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="5 years of experience"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Certifications
                </label>
                <input
                  type="text"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  placeholder="2"
                  value={formData.certifications}
                  onChange={(e) =>
                    setFormData({ ...formData, certifications: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 mt-8">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-3 text-white bg-primary rounded-lg hover:bg-primary/90 transition-colors"
              >
                Update Instructor
              </button>
            </div>
          </form>
        </motion.div>
      </>
    );
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      setSearchQuery(value);
      setCurrentPage(1);
    }, 750),
    []
  );

  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value);
  };

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
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
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50 mt-20">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Instructors
                  </h1>
                  <p className="text-gray-600">Manage your gym instructors</p>
                </div>
                <div className="flex items-center gap-5">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowRequests(true)}
                    className="relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 group"
                  >
                    <Bell className="w-5 h-5 group-hover:animate-swing" />
                    {/* <span>Requests</span> */}
                    {requests.length > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                        {requests.length}
                      </span>
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowAddModal(true)}
                    className="bg-primary text-white px-4 py-2 rounded-lg flex items-center"
                  >
                    <FiPlus className="mr-2" />
                    Add Instructor
                  </motion.button>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search instructors..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    value={searchQuery}
                    onChange={handleSearchChange}
                  />
                </div>
              </div>
            </div>

            {/* Instructors Table */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Instructor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Contact
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Specialties
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {instructors.map((instructor) => (
                      <tr key={instructor._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={instructor.image}
                                alt={instructor.fullName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {instructor.fullName}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-col space-y-1">
                            <div className="flex items-center text-sm text-gray-600">
                              <FiMail className="mr-2" />
                              {instructor.email}
                            </div>
                            <div className="flex items-center text-sm text-gray-600">
                              <FiPhone className="mr-2" />
                              {instructor.phone}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex flex-wrap gap-2">
                            {instructor.specialties.map((specialty, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                <FiActivity className="mr-1" />
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              instructor.status === "inactive"
                                ? "bg-red-100 text-red-800"
                                : "bg-green-100 text-green-800"
                            }`}
                          >
                            {instructor.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <button
                            onClick={() =>
                              setEditModal({ isOpen: true, instructor })
                            }
                            className="text-indigo-600 hover:text-indigo-900 mr-3"
                          >
                            <FiEdit2 size={18} />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteModal({
                                isOpen: true,
                                id: instructor._id,
                              })
                            }
                            className="text-red-600 hover:text-red-900"
                          >
                            <FiTrash2 size={18} />
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
                      onClick={goToPreviousPage}
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
                      onClick={goToNextPage}
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
                          {(currentPage - 1) * instructorsPerPage + 1}
                        </span>{" "}
                        to{" "}
                        <span className="font-medium">
                          {Math.min(
                            currentPage * instructorsPerPage,
                            instructors.length
                          )}
                        </span>{" "}
                        of{" "}
                        <span className="font-medium">
                          {instructors.length}
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
                          onClick={goToPreviousPage}
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
                            onClick={() => setCurrentPage(i + 1)}
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
                          onClick={goToNextPage}
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

      <AnimatePresence>
        {deleteModal.isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">
                <div className="p-6">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                    <FiAlertTriangle className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    Delete Instructor
                  </h3>
                  <p className="text-gray-500 text-center mb-6">
                    Are you sure you want to delete this instructor? This action
                    cannot be undone.
                  </p>
                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() =>
                        setDeleteModal({ isOpen: false, id: null })
                      }
                      className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleDeleteInstructor}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
                    >
                      Delete
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <InstructorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <EditInstructorModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, instructor: null })}
        instructor={editModal.instructor}
      />

      <AnimatePresence>
        {showRequests && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setShowRequests(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed top-[10%] left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Trainer Requests
                  </h2>
                  <button
                    onClick={() => setShowRequests(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-6 space-y-4">
                {requests.length === 0 ? (
                  <p className="text-gray-600">No pending requests.</p>
                ) : (
                  requests.map((request) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full overflow-hidden">
                              <img
                                src={request.image}
                                alt={request.fullName}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {request.fullName}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {request.experience} experience
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleApproveRequest(request._id)}
                            className="bg-green-50 text-green-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-green-100 transition-colors flex items-center gap-1"
                          >
                            <CheckCircle className="w-4 h-4" />
                            Accept
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => handleRejectRequest(request._id)}
                            className="bg-red-50 text-red-600 px-4 py-2 rounded-full text-sm font-medium hover:bg-red-100 transition-colors flex items-center gap-1"
                          >
                            <XCircle className="w-4 h-4" />
                            Reject
                          </motion.button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="text-sm">{request.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span className="text-sm">{request.phone}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Award className="w-4 h-4 text-indigo-600" />
                          <span className="text-sm font-medium text-gray-700">
                            Specialties
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {request.specialties.map((specialty, index) => (
                            <span
                              key={index}
                              className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-sm"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  ))
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default InstructorsPage;
