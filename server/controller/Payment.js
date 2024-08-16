// File: controller/Payment.js
const connection = require("../config/connection");

const getpayment = (req, res) => {
  const sql = `
    SELECT payment.*,
           student_registation.name,
           DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date
    FROM payment
    JOIN student_registation ON payment.stud_id = student_registation.id`;

  connection.query(sql, (error, results) => {
    if (error) {
      console.error("Error getting payment data: ", error);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving payment data." });
    }
    res.json(results);
  });
};

const getPaymentParID = (req, res) => {
  const paymentId = req.params.id;
  const sql = `
    SELECT payment.*,
           student_registation.name,
              DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date
    FROM payment
    JOIN student_registation ON payment.stud_id = student_registation.id
    WHERE payment.id = ? `;

  connection.query(sql, [paymentId], (error, results) => {
    if (error) {
      console.error("Error getting payment data: ", error);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving payment data." });
    }
    res.json(results);
  });
};



const getPaymentstdID = (req, res) => {
  const paymentId = req.params.id;
  const sql = `
    SELECT payment.*,
           student_registation.name,
              DATE_FORMAT(due_date, '%Y-%m-%d') AS due_date
    FROM payment
    JOIN student_registation ON payment.stud_id = student_registation.id
    WHERE payment.stud_id = ? `;

  connection.query(sql, [paymentId], (error, results) => {
    if (error) {
      console.error("Error getting payment data: ", error);
      return res
        .status(500)
        .json({ error: "An error occurred while retrieving payment data." });
    }
    res.json(results);
  });
};


const addPayment = async (req, res) => {
  try {
    const { stud_id, amount, type, due_date, description } = req.body;

    const sql =
      "INSERT INTO payment (stud_id, amount, type, due_date, description) VALUES (?, ?, ?, ?, ?)";
    const values = [stud_id, amount, type, due_date, description];

    await connection.query(sql, values);

    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

const editPayment = async (req, res) => {
  try {
    const id = req.params.id;
    const { stud_id, amount, type, due_date, description } = req.body;

    const query =
      "UPDATE payment SET stud_id = ?, amount = ?, type = ?, due_date = ?, description = ? WHERE id = ?";

    const values = [stud_id, amount, type, due_date, description, id];
    await connection.query(query, values);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error Adding Data", error);
    res.status(500).send("Internal Server Error");
  }
};

const deletePayment = async (req, res) => {
  const id = req.params.id;
  const query = "DELETE FROM payment WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Error deleting item from the database" });
    } else {
      res.json({ message: "Item deleted successfully" });
    }
  });
};
module.exports = {
  getpayment,
  addPayment,
  getPaymentParID,
  getPaymentstdID,
  editPayment,
  deletePayment
};
