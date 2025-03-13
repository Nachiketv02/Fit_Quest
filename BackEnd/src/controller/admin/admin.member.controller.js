const userModel = require("../../model/user.model");
const { validationResult } = require("express-validator");

exports.getAllMembers = async (req, res) => {
    try {
        const members = await userModel.find({ role: "user" , isSubscribed: true});
        res.status(200).json({
            success: true,
            message: "Members fetched successfully",
            data: members
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch members",
            error: error.message
        });
    }
};
