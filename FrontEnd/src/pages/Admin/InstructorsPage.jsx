import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiPlus,
  FiSearch,
  FiEdit2,
  FiTrash2,
  FiMail,
  FiPhone,
  FiActivity,
  FiAlertTriangle,
} from "react-icons/fi";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminHeader from "../../components/Admin/AdminHeader";
import {
  getInstructors,
  addInstructor,
  updateInstructor,
  deleteInstructor,
} from "../../services/Admin/api";

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

  useEffect(() => {
    fetchInstructors();
  }, []);

  const fetchInstructors = async () => {
    try {
      const data = await getInstructors();
      setInstructors(data);
    } catch (error) {
      console.log(error);
    }
  };

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
      email: "",
      phone: "",
      specialties: [],
      image: "",
    });

    const handleAddInstructor = async () => {
      const newInstructor = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        image: formData.image,
      };

      try {
        const data = await addInstructor(newInstructor);
        setInstructors([...instructors, data]);
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          specialties: "",
          image: "",
        });
        onClose();
      } catch (error) {
        console.log(error.m);
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
          className="fixed inset-x-0 top-[10%] mx-auto max-w-2xl bg-white rounded-lg shadow-xl z-50 p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Add New Instructor
          </h2>

          <form className="space-y-4" onSubmit={handleAddInstructor}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter instructor's full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter phone number"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter specialties (comma separated)"
                value={formData.specialties}
                onChange={(e) =>
                  setFormData({ ...formData, specialties: e.target.value })
                }
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter profile image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
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
      email: "",
      phone: "",
      specialties: "",
      image: "",
    });
  
    useEffect(() => {
      if (instructor) {
        setFormData({
          fullName: instructor.fullName,
          email: instructor.email,
          phone: instructor.phone,
          specialties: instructor.specialties.join(", "),
          image: instructor.image,
        });
      }
    }, [instructor]);
  
    const handleEditInstructor = async () => {
      const updatedInstructor = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        image: formData.image,
      };
  
      try {
        const data = await updateInstructor(instructor._id, updatedInstructor);
        setInstructors(instructors.map(inst => inst._id === instructor._id ? data : inst));
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          specialties: "",
          image: "",
        });
        onClose();
      } catch (error) {
        console.log(error);
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
          className="fixed inset-x-0 top-[10%] mx-auto max-w-2xl bg-white rounded-lg shadow-xl z-50 p-6"
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Edit Instructor
          </h2>
  
          <form className="space-y-4" onSubmit={handleEditInstructor}>
            {/* Form Fields Similar to Add Modal */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter instructor's full name"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter email address"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter phone number"
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter specialties (comma separated)"
                value={formData.specialties}
                onChange={(e) =>
                  setFormData({ ...formData, specialties: e.target.value })
                }
              />
            </div>
  
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Profile Image URL
              </label>
              <input
                type="url"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary focus:border-primary"
                placeholder="Enter profile image URL"
                value={formData.image}
                onChange={(e) =>
                  setFormData({ ...formData, image: e.target.value })
                }
              />
            </div>
  
            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/90"
              >
                Update Instructor
              </button>
            </div>
          </form>
        </motion.div>
      </>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar for desktop */}
      <AdminSidebar isMobile={false} isOpen={true} />

      {/* Mobile Sidebar */}
      <AdminSidebar
        isMobile={true}
        isOpen={isMobileSidebarOpen}
        onClose={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader
          title="Instructors"
          onMenuClick={() => setIsMobileSidebarOpen(true)}
        />

        {/* Main content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="bg-white rounded-xl shadow-md p-6 mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  <h1 className="text-2xl font-bold text-gray-800">
                    Instructors
                  </h1>
                  <p className="text-gray-600">Manage your gym instructors</p>
                </div>
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

            {/* Filters and Search */}
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
                    onChange={(e) => setSearchQuery(e.target.value)}
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
            </div>
          </div>
        </main>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteModal.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50"
              onClick={() => setDeleteModal({ isOpen: false, id: null })}
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50"
            >
              {/* Modal Content */}
              <div className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-md">
                <div className="p-6">
                  {/* Icon */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
                    <FiAlertTriangle className="w-6 h-6 text-red-600" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-semibold text-gray-900 text-center mb-2">
                    Delete Instructor
                  </h3>

                  {/* Message */}
                  <p className="text-gray-500 text-center mb-6">
                    Are you sure you want to delete this instructor? This action
                    cannot be undone.
                  </p>

                  {/* Buttons */}
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

      {/* Add Instructor Modal */}
      <InstructorModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
      />

      <EditInstructorModal
        isOpen={editModal.isOpen}
        onClose={() => setEditModal({ isOpen: false, instructor: null })}
        instructor={editModal.instructor}
      />

    </div>
  );
}

export default InstructorsPage;
