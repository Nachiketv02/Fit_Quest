const classesModel = require("../model/admin/classes.model");
const cron = require("node-cron");
const userModel = require("../model/user.model");

const deleteExpiredClasses = async () => {
    try {
        const now = new Date();

        // Fetch all classes
        const classes = await classesModel.find();

        // Filter classes with startDate in the past
        const expiredClasses = classes.filter((cls) => {
            const [day, month, year] = cls.startDate.split('/');
            const classDate = new Date(`${year}-${month}-${day}`);
            return classDate < now;
        });

        // Delete expired classes
        const result = await classesModel.deleteMany({
            _id: { $in: expiredClasses.map((cls) => cls._id) },
        });

        console.log(`Deleted ${result.deletedCount} expired classes.`);
    } catch (error) {
        console.error("Error deleting expired classes:", error);
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
