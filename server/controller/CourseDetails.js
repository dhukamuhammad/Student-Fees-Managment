const connection = require("../config/connection");

// get code 
const getCourseDetails = (req, res) => {
  const sql = "SELECT * FROM course_details";
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data Brand Table in server.js" + error);
    }
    return res.json(result);
  });
};

// get code per id 
const getPerCourseDetails = async (req, res) => {
  const q = "SELECT * FROM course_details WHERE id = ?";
  connection.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// add code 
const addCourseDetails = async (req, res) => {
  try {
    const { course_name, description, fees, duration } = req.body;

    const sql =
      "INSERT INTO course_details (course_name, description,fees,duration) VALUES (?, ?, ?, ?)";
    const values = [course_name, description, fees, duration];

    await connection.query(sql, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

// delete code 
const deleteCourse = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM course_details WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error deleting item from the database" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
};

// edite code 
const editCourseDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const { course_name, description, fees, duration } = req.body;

    const query =
      "UPDATE course_details SET course_name = ?, description = ?, fees = ?, duration = ? WHERE id = ?";

    const values = [course_name, description, fees, duration, id];
    await connection.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getCourseDetails,
  getPerCourseDetails,
  addCourseDetails,
  deleteCourse,
  editCourseDetails,
};
