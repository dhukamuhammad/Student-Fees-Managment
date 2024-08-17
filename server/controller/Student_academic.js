const connection = require("../config/connection");

// get code 
const getStudent_academic = (req, res) => {
  const sql = `SELECT  student_academic  .*, 
             student_registation.name,
             course_details.course_name,
             course_details.duration,

             DATE_FORMAT(DATE(student_academic.join_date), '%d-%m-%Y') AS join_date,
             DATE_FORMAT(DATE(student_academic.finished_date), '%d-%m-%Y') AS finished_date,
             DATE_FORMAT(DATE(student_academic.approx_finished_date), '%d-%m-%Y') AS approx_finished_date

             FROM student_academic 

             JOIN student_registation ON student_academic.s_id = student_registation.id 
             JOIN course_details ON student_academic.c_id = course_details.id `;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data Brand Table in server.js" + error);
    }
    return res.json(result);
  });
};

// get code per id 
const getPerAcademic = async (req, res) => {
  const q = `SELECT student_academic .*,
      student_registation.name,
      course_details.course_name,
      course_details.duration,

     DATE_FORMAT(join_date, '%Y-%m-%d') AS join_date, 
     DATE_FORMAT(finished_date, '%Y-%m-%d') AS finished_date 
     FROM student_academic 

    JOIN student_registation ON student_academic.s_id = student_registation.id 
    JOIN course_details ON student_academic.c_id = course_details.id 
     
     WHERE student_academic.id = ? `;
  connection.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

const getPercourse = async (req, res) => {
  const q = `SELECT student_academic .*,
      student_registation.name,
      course_details.course_name,
      course_details.duration,

     DATE_FORMAT(join_date, '%Y-%m-%d') AS join_date, 
     DATE_FORMAT(finished_date, '%Y-%m-%d') AS finished_date 
     FROM student_academic 

    JOIN student_registation ON student_academic.s_id = student_registation.id 
    JOIN course_details ON student_academic.c_id = course_details.id 
     
     WHERE student_academic.s_id = ? `;
  connection.query(q, [req.params.id], (err, data) => {
    if (err) {
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

// add code 
const addAcademic = async (req, res) => {
  try {
    const { s_id, c_id, fess, join_date, finished_date } = req.body;

    const sql =
      "INSERT INTO student_academic (s_id, c_id,fess,join_date,finished_date) VALUES (?, ?, ?, ?, ?)";
    const values = [s_id, c_id, fess, join_date, finished_date];

    await connection.query(sql, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

//delete code 
const deleteAcademic = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM student_academic WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error deleting item from the database" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
};

// edite code 
const editAcademic = async (req, res) => {
  try {
    const id = req.params.id;
    const { s_id, c_id, fess, join_date, finished_date } = req.body;

    const query =
      "UPDATE student_academic SET s_id = ?, c_id = ?, fess = ?,   join_date = ?, finished_date = ? WHERE id = ?";

    const values = [s_id, c_id, fess, join_date, finished_date, id];
    await connection.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getStudent_academic,
  getPerAcademic,
  addAcademic,
  deleteAcademic,
  editAcademic,
  getPercourse
};
