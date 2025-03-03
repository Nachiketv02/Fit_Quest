const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controller/user.controller");

router.post("/signup", [
    body("fullName").isLength({ min: 3 }),
    body("email").isEmail(),
    body("phone").isLength({ min: 10 }),
    body("gender").isIn(["male", "female","other"]),
    body("password").isLength({ min: 6 })
],userController.signupUser);

router.post("/verify",userController.verifyUser);

router.post('/resend',userController.resendVerificationCode);

router.post('/login',[
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
],userController.loginUser);

router.post('/forgot-password',userController.forgotPassword);

router.put('/reset-password/:token',userController.resetPassword);

module.exports = router;