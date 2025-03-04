const mongoose = require("mongoose");

const blackListTokenSchema = new mongoose.Schema({
    token : {
        type : String,
        required : true,
        unique : true
    },
    createdAt : {
        type : Date,
        required : true,
        default : 86400
    }
})

const blackListTokenModel = mongoose.model("blackListToken", blackListTokenSchema);

module.exports = blackListTokenModel;