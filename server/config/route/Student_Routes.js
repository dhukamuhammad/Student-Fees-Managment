const express = require("express");
const router = express.Router();

const student = require("../controller/Student");
const middleware = require("../controller/Middleware");

router.route("/getstudent").get(student.getstudent);
router.route("/getperstudent/:id").get(student.getperstudent);


router.post(
  "/addStudent",
  middleware.uploads.single("profile_pic"),
  student.addStudentData
);
router.put(
  "/editStudent/:id",
  middleware.uploads.single("profile_pic"),
  student.editstudent
);

router.delete("/deletestudent/:id", student.deleteStudent);

module.exports = router;
