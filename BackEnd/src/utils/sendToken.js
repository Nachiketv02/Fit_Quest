module.exports.sendToken = (user, statusCode, message, res) => {
    const token = user.generateAuthToken();
    res
    .status(statusCode)
    .cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000 
    })
    .setHeader("Authorization", `Bearer ${token}`)
    .json({ user, token, message });
}

// const token = user.generateAuthToken();

//     res.cookie("token", token , {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production", // Set true in production
//       sameSite: "lax",
//       maxAge: 24 * 60 * 60 * 1000, // 24 hours
//     });

//     res.setHeader("Authorization", `Bearer ${token}`);

//     console.log("Authorization Header:", res.get("Authorization"));
//     console.log("Token Cookie:", res.cookie.token);

//     return res.status(200).json({ user, token, message: "Login successful" });