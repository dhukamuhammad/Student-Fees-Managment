const express = require("express");
const router = express.Router();

// const student = require("../controller/Student");
const Student_academic = require("../controller/Student_academic");
// const middleware = require("../controller/Middleware");

router.route("/getStudent_academic").get(Student_academic.getStudent_academic);
router.post("/addAcademic", Student_academic.addAcademic);

module.exports = router;
