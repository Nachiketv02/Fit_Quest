const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
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
    gender : {
        type : String,
        required : true,
        enum : ["male", "female","other"]
    },
    password : {
        type : String,
        required : true
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({ _id : this._id }, process.env.JWT_SECRET, {
        expiresIn : "24h"
    });
    return token;
}

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

userSchema.static.generateOTP = async function(){
    const code = crypto.randomInt(Math.pow(10, 5),Math.pow(10, 6)).toString();
    return code;
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;


