const instructorModel = require("../../model/admin/instructor.model");

module.exports.createInstructor = async function({fullName, email, phone, specialties, image, title, experience, certifications}) {
    try {

        if (!fullName || !email || !phone || !specialties || !image || !title || !experience || !certifications) {
            throw new Error("All fields are required");
        }

        const instructor = await instructorModel.create({
            fullName,
            email, 
            title,
            phone,
            specialties : Array.isArray(specialties) ? specialties : [specialties],
            image,
            experience,
            certifications
        });

        return instructor;
    } 
    catch (error) {
        console.log("Error in createInstructor Service:", error.message);
        throw error;
    }
}