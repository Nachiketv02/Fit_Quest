const mongoose = require("mongoose");

const classSchema = new mongoose.Schema({
    className : {
        type : String,
        required : true,
        minLength : [3,"Minimum length is 3"],
        maxLength : [50,"Maximum length is 50"]
    },
    category : {
        type : String,
        required : true,
        enum : ["cardio", "strength", "yoga & flexibility", "hiit", "dance"]
    },
    instructor : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "instructor"
    },
    startDate : {
        type : String,
        required : true
    },
    times : {
        type : String,
        required : true
    },
    duration : {
        type : String,
        required : true,
        enum : ["30 minutes", "45 minutes", "60 minutes"],
        default : "30 minutes"
    },
    capacity : {
        type : Number,
        required : true,

    },
    room : {
        type : String,
        required : true,
        enum : ["Studio A", "Studio B", "Studio C", "Studio D", "Studio E"]
    },
    enrolled : {
        type : Number,
        default : 0
    },
    description : {
        type : String,
        required : true,
        minLength : [3,"Minimum length is 3"],
        maxLength : [100,"Maximum length is 100"]
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

const classesModel = mongoose.model("classes", classSchema);

module.exports = classesModel;

