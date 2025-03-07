const instructorService = require("../../service/admin/instructors.service");
const instructorModel = require("../../model/admin/instructor.model");
const { validationResult } = require("express-validator");

module.exports.createInstructor = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { fullName, email, phone, specialties, image } = req.body;

    if (!fullName || !email || !phone || !specialties || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const existingInstructor = await instructorModel.findOne({ email });
    if (existingInstructor) {
      return res.status(400).json({ error: "Instructor already exists" });
    }

    const instructor = await instructorService.createInstructor({
      fullName,
      email,
      phone,
      specialties,
      image,
    });

    return res
      .status(201)
      .json({ message: "Instructor created successfully", instructor });
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

    const { fullName, email, phone, specialties, image } = req.body;

    if (!fullName || !email || !phone || !specialties || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const instructor = await instructorModel.findByIdAndUpdate(req.params.id, {
      fullName,
      email,
      phone,
      specialties: Array.isArray(specialties) ? specialties : [specialties],
      image,
    });

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
