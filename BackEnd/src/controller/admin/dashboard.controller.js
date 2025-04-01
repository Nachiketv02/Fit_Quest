const userModel = require("../../model/user.model");
const bookingModel = require("../../model/booking.model");
const classesModel = require("../../model/admin/classes.model");
const instructorModel = require("../../model/admin/instructor.model");
const { validationResult } = require("express-validator");

module.exports.getTotalMembers = async (req, res) => {
  try {
    const users = await userModel.countDocuments();
    return res.status(200).json({ users });
  } catch (error) {
    console.log("Error in getTotalMembers Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getTotalBookings = async (req, res) => {
  try {
    const bookings = await bookingModel.countDocuments();
    return res.status(200).json({ bookings });
  } catch (error) {
    console.log("Error in getTotalAttendance Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getTotalSubscriptions = async (req, res) => {
  try {
    const subscriptions = await userModel.countDocuments({
      isSubscribed: true,
    });
    return res.status(200).json({ subscriptions });
  } catch (error) {
    console.log("Error in getTotalSubscriptions Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getClassSchedule = async (req, res) => {
  try {
    const classes = await classesModel
      .find({ status: "active" })
      .sort({ startDate: 1, times: 1 })
      .populate("instructor")
      .limit(4);
    return res.status(200).json({ classes });
  } catch (error) {
    console.log("Error in getClassSchedule Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports.getRecentMembers = async (req, res) => {
  try {
    const members = await userModel
      .find({ isSubscribed: true })
      .sort({ subscriptionStartDate: -1 });
    return res.status(200).json({ members });
  } catch (error) {
    console.log("Error in getRecentMembers Controller:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Get popular classes
module.exports.getPopularClasses = async (req, res) => {
    try {
      const popularClasses = await classesModel.aggregate([
        { $match: { status: "active" } },
        { $sort: { enrolled: -1 } },
        { $limit: 4 },
        { $project: {
          _id: 1,
          className: 1,
          enrolled: 1,
          category: 1
        }}
      ]);
  
      // Calculate trends (simplified - compare with previous period)
      const classTrends = await Promise.all(popularClasses.map(async cls => {
        const prevEnrollment = await bookingModel.countDocuments({
          classesId: cls._id,
          bookedAt: { $lt: new Date(new Date() - 30*24*60*60*1000) }
        });
        
        const currentEnrollment = cls.enrolled;
        const trend = prevEnrollment > 0 
          ? Math.round(((currentEnrollment - prevEnrollment) / prevEnrollment) * 100)
          : 100;
  
        return {
          id: cls._id,
          name: cls.className,
          attendees: currentEnrollment,
          trend: `${trend}%`,
          icon: getClassIcon(cls.category)
        };
      }));
  
      res.status(200).json({ popularClasses: classTrends });
    } catch (error) {
      console.error("Error fetching popular classes:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

// Helper function to get emoji icon based on class category
function getClassIcon(category) {
  const icons = {
    cardio: "🏃‍♂️",
    strength: "🏋️‍♂️",
    "yoga & flexibility": "🧘‍♀️",
    hiit: "💪",
    dance: "💃",
  };
  return icons[category.toLowerCase()] || "🏟️";
}
