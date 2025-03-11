const classesModel = require('../model/admin/classes.model');
const cron = require("node-cron");

const deleteExpiredClasses = async () => {
    try {
        const now = new Date();
        const result = await Classes.deleteMany({ startDate: { $lt: now } });
        console.log(`Deleted ${result.deletedCount} expired classes.`);
    } catch (error) {
        console.error("Error deleting expired classes:", error);
    }
};

const checkSubscription = async () => {
    try {
        const now = new Date();
        await User.updateMany(
            { subscriptionEndDate: { $lt: now }, subscriptionStatus: "active" },
            { $set: { subscriptionStatus: "inactive" } }
        );
        console.log("Updated expired subscriptions.");
    } catch (error) {
        console.error("Error updating expired subscriptions:", error);
    }
};

cron.schedule("0 * * * *", deleteExpiredClasses);
cron.schedule("0 0 * * *", checkSubscription);

