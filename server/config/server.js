const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4002;

// const login = require("./route/login");
const student = require("./route/Student_Routes");
const Student_academic = require("./route/Student_academic_Routes");
const CourseDetails = require("./route/CourseDetailsRoute");

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/", (req, res) => {
  return res.json("From  Server ");
});
app.use("/", student);
app.use("/", Student_academic);
app.use("/", CourseDetails);

app.listen(PORT, () => {
  console.log(`Server Listening on port ` + PORT);
});
