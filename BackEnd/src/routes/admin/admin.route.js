const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const {body} = require("express-validator");
const adminInstructorsController = require("../../controller/admin/admin.instructors.controller");

router.post("/instructors", authMiddleware.isAuthenticated, authMiddleware.isAdmin ,[
    body("fullName").isLength({ min: 3 }).withMessage("Full Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("phone").isLength({ min: 10 }).withMessage("Phone number must be at least 10 characters long"),
    body("specialties").isArray().withMessage("Specialties must be an array"),
    body("image").isURL().withMessage("Image must be a valid URL")
] , adminInstructorsController.createInstructor);

router.get("/instructors", authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminInstructorsController.getAllInstructors);

router.put("/instructors/:id", authMiddleware.isAuthenticated, authMiddleware.isAdmin ,[
    body("fullName").isLength({ min: 3 }).withMessage("Full Name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Email must be a valid email"),
    body("phone").isLength({ min: 10 }).withMessage("Phone number must be at least 10 characters long"),
    body("specialties").isArray().withMessage("Specialties must be an array"),
    body("image").isURL().withMessage("Image must be a valid URL")
] , adminInstructorsController.updateInstructor);

router.delete("/instructors/:id", authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminInstructorsController.deleteInstructor);

module.exports = router;