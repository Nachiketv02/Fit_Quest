const classesModel = require("../model/admin/classes.model");
const cron = require("node-cron");
const userModel = require("../model/user.model");
const bookingModel = require("../model/booking.model");

const deleteExpiredClasses = async () => {
  try {
    const now = new Date();
    const classes = await classesModel.find();

    const expiredClasses = classes.filter((cls) => {
      if (!cls.startDate || !cls.times) return false;

      const [day, month, year] = cls.startDate.split('/');
      if (!day || !month || !year) {
        return false;
      }

      const timeMatch = cls.times.match(/(\d+):(\d+)\s?(AM|PM)/i);
      if (!timeMatch) {
        return false;
      }

      let [_, hours, minutes, meridiem] = timeMatch;
      hours = parseInt(hours);
      minutes = parseInt(minutes);

      if (meridiem.toUpperCase() === "PM" && hours < 12) hours += 12;
      if (meridiem.toUpperCase() === "AM" && hours === 12) hours = 0;

      const classDateTimeStr = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:00`;
      const classDateTime = new Date(classDateTimeStr);

      return classDateTime < now;
    });

    // Delete expired classes from the classesModel
    const result = await classesModel.updateMany(
      { _id: { $in: expiredClasses.map((cls) => cls._id) } },
      { $set: { status: "inactive" } }
    );

    // Update bookings for expired classes
    await bookingModel.updateMany(
      { classesId: { $in: expiredClasses.map((cls) => cls._id) } },
      { $set: { status: "completed" } }
    );

    console.log(`Updated ${result.modifiedCount} expired classes.`);
    console.log(`Updated ${result.modifiedCount} bookings for expired classes.`);
  } catch (error) {
    console.error("Error updating expired classes:", error);
  }
};

const checkSubscription = async () => {
  try {
    const now = new Date();
    await userModel.updateMany(
      { subscriptionEndDate: { $lt: now }, subscriptionStatus: "active" },
      { $set: { subscriptionStatus: "inactive" } }
    );
    console.log("Updated expired subscriptions.");
  } catch (error) {
    console.error("Error updating expired subscriptions:", error);
  }
};

cron.schedule("0 * * * *", () => {
  console.log("Running deleteExpiredClasses job");
  deleteExpiredClasses();
});

cron.schedule("0 0 * * *", () => {
  console.log("Running checkSubscription job");
  checkSubscription();
});