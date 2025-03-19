const instructorService = require("../../service/admin/instructors.service");
const instructorModel = require("../../model/admin/instructor.model");
const trainerRequestModel = require("../../model/admin/trainerRequest.model");
const userModel = require("../../model/user.model");
const { validationResult } = require("express-validator");

module.exports.createInstructor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, specialties, image, title, experience, certifications } = req.body;

    // Call the service function
    const instructor = await instructorService.createInstructor({
      fullName,
      email,
      phone,
      specialties,
      image,
      title,
      experience,
      certifications,
    });

    // Check if the instructor was created successfully
    if (!instructor || !instructor._id) {
      return res.status(500).json({ error: "Failed to create instructor" });
    }

    // Return success response
    return res.status(201).json({ message: "Instructor created successfully", instructor });
  } catch (error) {
    console.log("Error in createInstructor Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllInstructors = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const skip = (page - 1) * limit;
    
    const instructors = await instructorModel
      .find({})
      .skip(skip)
      .limit(limit);

    const totalInstructors = await instructorModel.countDocuments({});

    const totalPages = Math.ceil(totalInstructors / limit);

    return res.status(200).json({
      instructors,
      pagination: {
        currentPage: page,
        totalPages,
        totalInstructors,
        instructorsPerPage: limit,
      },
    });
  } catch (error) {
    console.log("Error in getAllInstructors Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.updateInstructor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, specialties, image, title, experience, certifications } = req.body;

    if (!fullName || !email || !phone || !specialties || !image || !title || !experience || !certifications) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const instructor = await instructorModel.findByIdAndUpdate(req.params.id, {
      fullName,
      title,
      email,
      phone,
      specialties: Array.isArray(specialties) ? specialties : [specialties],
      image,
      experience,
      certifications
    }, { new: true });

    if (!instructor) {
      return res.status(404).json({ error: "Instructor not found" });
    }

    return res
      .status(200)
      .json({ message: "Instructor updated successfully", instructor });
  } catch (error) {
    console.log("Error in updateInstructor Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.deleteInstructor = async (req, res) => {
  try {
    const instructor = await instructorModel.findByIdAndDelete(req.params.id);
    return res
      .status(200)
      .json({ message: "Instructor deleted successfully", instructor });
  } catch (error) {
    console.log("Error in deleteInstructor Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.searchInstructors = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;

    if (!q) {
      return res.status(400).json({ error: "Query is required" });
    }
    const instructors = await instructorModel
      .find({
        $or: [
          { fullName: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
          { specialties: { $regex: q, $options: "i" } },
        ],
      })
      .skip(skip)
      .limit(limit);

      const total = await instructorModel.countDocuments({
        $or: [
          { fullName: { $regex: q, $options: "i" } },
          { email: { $regex: q, $options: "i" } },
          { specialties: { $regex: q, $options: "i" } },
        ],
      });

    return res.status(200).json({ instructors , total});

  } catch (error) {
    console.log("Error in searchInstructors Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllInstructorss = async (req, res) => {
  try {
    const instructors = await instructorModel.find();
    return res.status(200).json({ instructors });
  } catch (error) {
    console.log("Error in getAllInstructors Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.createTrainerRequest = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, title, email, phone, specialties, image, experience, certifications } = req.body;

    const alreadyRequested = await trainerRequestModel.findOne({ email });
    if (alreadyRequested) {
      return res.status(400).json({ error: "You have already requested" });
    }

    const existingUser = await userModel.findOne({ email , isSubscribed: true });
    if (existingUser) {
      return res.status(400).json({ error: "You are already subscribed! for apply kindly contact authorized person" });
    }
    
    const existingInstructor = await instructorModel.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ error: "Instructor already exists" });
    }

    const trainerRequest = await trainerRequestModel.create({
      fullName,
      title,
      email,
      phone,
      specialties: Array.isArray(specialties) ? specialties : [specialties],
      image,
      experience,
      certifications
    });

    return res.status(201).json({ message: "Trainer request created successfully", trainerRequest });
  } catch (error) {
    console.log("Error in createTrainerRequest Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getAllTrainerRequests = async (req, res) => {
  try {
    const trainerRequests = await trainerRequestModel.find().sort({ createdAt: -1 });
    return res.status(200).json({ trainerRequests });
  } catch (error) {
    console.log("Error in getAllTrainerRequests Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.approveTrainerRequest = async (req, res) => {
  try {
    const trainerRequest = await trainerRequestModel.findById(req.params.id);
    if (!trainerRequest) {
      return res.status(404).json({ error: "Trainer request not found" });
    }

    const newInstructors = await instructorService.createInstructor({
      fullName: trainerRequest.fullName,
      email: trainerRequest.email,
      phone: trainerRequest.phone,
      specialties: trainerRequest.specialties,
      image: trainerRequest.image,
      title: trainerRequest.title,
      experience: trainerRequest.experience,
      certifications: trainerRequest.certifications
    });

    newInstructors.status = "active";
    await newInstructors.save();

    await trainerRequestModel.findByIdAndDelete(req.params.id);

    return res.status(200).json({ message: "Trainer request approved successfully" });

  } catch (error) {
    console.log("Error in approveTrainerRequest Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.rejectTrainerRequest = async (req, res) => {
  try {
    const trainerRequest = await trainerRequestModel.findById(req.params.id);
    if (!trainerRequest) {
      return res.status(404).json({ error: "Trainer request not found" });
    }
    await trainerRequestModel.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Trainer request rejected successfully" });
  } catch (error) {
    console.log("Error in rejectTrainerRequest Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};
