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



module.exports = router;