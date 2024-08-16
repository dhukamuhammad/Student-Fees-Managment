const express = require("express");
const router = express.Router();

const CourseDetails = require("../controller/CourseDetails");

router.get("/getCourseDetails", CourseDetails.getCourseDetails);
router.get("/getPerCourseDetails/:id", CourseDetails.getPerCourseDetails);
router.post("/addCourseDetails", CourseDetails.addCourseDetails);
router.delete("/deleteCourse/:id", CourseDetails.deleteCourse);
router.put("/editCourseDetails/:id", CourseDetails.editCourseDetails);

module.exports = router;
