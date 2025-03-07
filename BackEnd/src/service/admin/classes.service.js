const classModel = require("../../model/admin/classes.model");

module.exports.createClass = async ({className, category, instructor, startDate, times, duration, capacity, room, description}) => {
    try {
        const newClass = await classModel.create({
            className,
            category,
            instructor,
            startDate,
            times,
            duration,
            capacity,
            room,
            description
        });
        return newClass;
    } catch (error) {
        console.log("Error in createClass Service:", error.message);
        return null;
    }
}