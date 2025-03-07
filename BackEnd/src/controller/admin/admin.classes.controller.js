const { validationResult } = require("express-validator");
const classesService = require("../../service/admin/classes.service");
const classesModel = require("../../model/admin/classes.model");

module.exports.createClass = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { className, category, instructor, startDate, times, duration, capacity, room, description } = req.body;

        if (!className || !category || !instructor || !startDate || !times || !duration || !capacity || !room || !description) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const existingClass = await classesModel.findOne({ instructor, startDate, times, room });
        if (existingClass) {
            return res.status(400).json({ error: "Class already exists" });
        }

        const newClass = await classesService.createClass({
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

        return res.status(201).json({ message: "Class created successfully", newClass });

    } catch (error) {
        console.log("Error in createClass Controller:", error.message);
        return res.status(500).json({ message: error.message });
    }
}