const express = require("express");
const router = express.Router();
const {body} = require("express-validator");
const userController = require("../controller/user.controller");
const authMiddleware = require("../middleware/auth.middleware");

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

router.get("/profile",authMiddleware.isAuthenticated,userController.getUserProfile);

router.get('/logout',authMiddleware.isAuthenticated,userController.logoutUser);

router.put('/subscription',authMiddleware.isAuthenticated,[
    body("plan").isIn(["basic", "premium", "elite","basic-annual", "premium-annual", "elite-annual"]).withMessage("Invalid plan"),
    body("billingCycle").isIn(["monthly", "annual"]).withMessage("Invalid billing cycle")
],userController.updateSubscription);

module.exports = router;