const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
        minLength : [3, "Minimum length is 3"],
        maxLength : [50, "Maximum length is 50"]
    },
    title : {
        type : String,
        required : true,
        enum : ["strength", "cardio", "yoga & flexibility", "hiit", "dance", "nutrition"]
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    phone : {
        type : String,
        required : true,
        unique : true
    },
    specialties : {
        type : [String],
        required : true
    },
    image : {
        type : String,
        required : true
    },
    status : {
        type : String,
        enum : ["active", "inactive"],
        default : "active"
    },
    experience : {
        type : String
    },
    certifications : {
        type : String
    },
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
});

instructorSchema.index({ fullName: 1, email: 1, specialties: 1 });

const instructorModel = mongoose.model("instructor", instructorSchema);

module.exports = instructorModel;