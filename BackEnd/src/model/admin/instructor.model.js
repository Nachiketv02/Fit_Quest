const mongoose = require("mongoose");

const instructorSchema = new mongoose.Schema({
    fullName : {
        type : String,
        required : true,
        minLength : [3, "Minimum length is 3"],
        maxLength : [50, "Maximum length is 50"]
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
    createdAt : {
        type : Date,
        required : true,
        default : Date.now
    }
});

const instructorModel = mongoose.model("instructor", instructorSchema);

module.exports = instructorModel;