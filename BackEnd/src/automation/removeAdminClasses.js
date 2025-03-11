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

cron.schedule("0 * * * *", deleteExpiredClasses);
