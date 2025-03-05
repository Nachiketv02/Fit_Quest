const instructorModel = require("../../model/admin/instructor.model");

module.exports.createInstructor = async function({fullName, email, phone, specialties, image}) {
    try {

        if (!fullName || !email || !phone || !specialties || !image) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const instructor = await instructorModel.create({
            fullName,
            email,
            phone,
            specialties : Array.isArray(specialties) ? specialties : [specialties],
            image,
        });

        return instructor;
    } 
    catch (error) {
        console.log("Error in createInstructor Service:", error.message);
    }
}