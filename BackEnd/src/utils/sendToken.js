module.exports.sendToken = (user, statusCode, message,res) => {
    const token = user.generateAuthToken();
    res
    .status(statusCode)
    .cookie("token", token, { expiresIn: "24h" })
    .json({ user, token, message });
}