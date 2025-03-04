const userModel = require("../model/user.model");
const blackListTokenModel = require("../model/blackListToken.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.isAuthenticated = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    if(!token){
        return res.status(401).json({ error: "Token not found you are Unauthorized" });
    }

    const blackListToken = await blackListTokenModel.findOne({ token });
        if(blackListToken){
            return res.status(401).json({ error: "BlackListToken found you are Unauthorized" });
        }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);
        if(!user){
            return res.status(401).json({ error: "User not found" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.log("Error in isAuthenticated:", error.message);
        return res.status(401).json({ error: error.message });
    }
}