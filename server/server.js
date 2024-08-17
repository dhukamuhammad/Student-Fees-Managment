const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = 4002;

// routes
const student = require("./route/Student_Routes");
const Student_academic = require("./route/Student_academic_Routes");
const CourseDetails = require("./route/CourseDetailsRoute");
const payment = require("./route/Payment_route");

// middlewer
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.use("/", student);
app.use("/", Student_academic);
app.use("/", CourseDetails);
app.use("/", payment);

app.get("/", (req, res) => {
  return res.json("From  Server ");
});

app.listen(PORT, () => {
  console.log(`Server Listening on port ` + PORT);
});
