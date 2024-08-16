const connection = require("../config/connection");

const getStudent_academic = (req, res) => {
  const sql = `SELECT  student_academic  .*, student_registation.name,course_details.course_name,course_details.duration,
             DATE_FORMAT(DATE(student_academic.join_date), '%d-%m-%Y') AS join_date,
             DATE_FORMAT(DATE(student_academic.finished_date), '%d-%m-%Y') AS finished_date,
             DATE_FORMAT(DATE(student_academic.approx_finished_date), '%d-%m-%Y') AS approx_finished_date


     FROM student_academic 
          JOIN student_registation ON student_academic.s_id = student_registation.id 
          JOIN course_details ON student_academic.c_id = course_details.id
    `;
  connection.query(sql, (error, result) => {
    if (error) {
      console.log("Error Getting Data Brand Table in server.js" + error);
    }
    return res.json(result);
  });
};

const addAcademic = async (req, res) => {
  try {
    const { s_id, c_id, join_date, finished_date, approx_finished_date } =
      req.body;

    const sql =
      "INSERT INTO student_academic (s_id, c_id,join_date,finished_date, approx_finished_date) VALUES (?, ?, ?, ?, ?)";
    const values = [s_id, c_id, join_date, finished_date, approx_finished_date];

    await connection.query(sql, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};
module.exports = {
  getStudent_academic,
  addAcademic,
};
