const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { type } = require("os");

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
        required : true,
    },
    role : {
        type : String,
        default : "user",
        enum : ["user", "admin"]
    },
    isVerified : {
        type : Boolean,
        default : false
    },
    verificationCode : {
        type : Number,
    },
    verificationCodeExpires : {
        type : Date,
        // default : Date.now,
        // expires : 86400
    },
    resetPasswordToken : {
        type : String,
    },
    resetPasswordTokenExpires : {
        type : Date,
        // default : Date.now,
        // expires : 86400
    },
    isSubscribed : {
        type : Boolean,
        default : false
    },
    subscription : {
        type : String,
        enum : ["basic", "premium", "elite", "basic-annual", "premium-annual", "elite-annual", "none"],
        default : "none"
    },
    subscriptionStatus : {
        type : String,
        enum : ["active", "inactive"],
        default : "inactive"
    },
    subscriptionStartDate : {
        type : Date,
    },
    subscriptionEndDate : {
        type : Date,
    },
    billingCycle: {
        type: String,
        enum: ["monthly", "annual"],
        default: "monthly"
    },
    createdAt : {
        type : Date,
        default : Date.now
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

    userSchema.methods.generateVerificationCode = async function(){
        const code = crypto.randomInt(Math.pow(10, 5),Math.pow(10, 6)).toString();
        this.verificationCode = code;
        this.verificationCodeExpires = Date.now() + 5 * 60 * 1000; //5 minutes
        return code;
    }

userSchema.methods.generateResetPasswordToken = async function(){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordTokenExpires = Date.now() + 5 * 60 * 1000;
    return resetToken;
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;


