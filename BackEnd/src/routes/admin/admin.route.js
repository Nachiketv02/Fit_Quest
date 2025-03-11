const express = require("express");
const router = express.Router();
const authMiddleware = require("../../middleware/auth.middleware");
const {body} = require("express-validator");
const adminInstructorsController = require("../../controller/admin/admin.instructors.controller");
const adminClassesController = require("../../controller/admin/admin.classes.controller");

//instructors

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

router.get('/instructors/search', authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminInstructorsController.searchInstructors);

//classes

router.post('/classes',authMiddleware.isAuthenticated, authMiddleware.isAdmin ,[
    body("className").isLength({ min: 3 }).withMessage("Class Name must be at least 3 characters long"),
    body('startDate').isDate().withMessage("Start Date must be a date"),
    body('times').isString().withMessage("Times must be a string"),
    body('duration').isString().withMessage("Duration must be a string"),
    body('capacity').isInt().withMessage("Capacity must be an integer"),
    body('room').isIn(["Studio A", "Studio B", "Studio C", "Studio D", "Studio E"]).withMessage("Room must be a valid room"),
    body('description').isString().withMessage("Description must be a string") 
], adminClassesController.createClass);

router.get('/classes', authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminClassesController.getAllClasses);

router.get('/classes/search', authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminClassesController.searchClasses);

router.put('/classes/:id',authMiddleware.isAuthenticated, authMiddleware.isAdmin ,[
    body("className").isLength({ min: 3 }).withMessage("Class Name must be at least 3 characters long"),
    body('startDate').isDate().withMessage("Start Date must be a date"),
    body('times').isString().withMessage("Times must be a string"),
    body('duration').isString().withMessage("Duration must be a string"),
    body('capacity').isInt().withMessage("Capacity must be an integer"),
    body('room').isIn(["Studio A", "Studio B", "Studio C", "Studio D", "Studio E"]).withMessage("Room must be a valid room"),
    body('description').isString().withMessage("Description must be a string") 
], adminClassesController.updateClass);

router.delete('/classes/:id',authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminClassesController.deleteClass);

router.get('/instructors/all', authMiddleware.isAuthenticated, authMiddleware.isAdmin ,adminInstructorsController.getAllInstructorss);

module.exports = router;