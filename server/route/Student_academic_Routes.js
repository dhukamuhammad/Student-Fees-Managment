const express = require("express");
const router = express.Router();

const Student_academic = require("../controller/Student_academic");

router.route("/getStudent_academic").get(Student_academic.getStudent_academic);
router.get("/getPerAcademic/:id", Student_academic.getPerAcademic);
router.get("/getPercourse/:id", Student_academic.getPercourse);
router.post("/addAcademic", Student_academic.addAcademic);
router.delete("/deleteAcademic/:id", Student_academic.deleteAcademic);
router.put("/editAcademic/:id", Student_academic.editAcademic);


module.exports = router;
