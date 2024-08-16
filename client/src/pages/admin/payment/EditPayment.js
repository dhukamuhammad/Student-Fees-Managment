import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditPayment() {
  const location = useLocation();
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [addPayment, setAddPayment] = useState({
    stud_id: "",
    name: "",
    amount: "",
    type: "",
    due_date: "",
    description: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();

    if (location.state && location.state.id) {
      fetchPaymentWithId(location.state.id);
    }
  }, [location.state?.id]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4002/getstudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchPaymentWithId = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4002/getPaymentParID/${id}`
      );
      console.log("Payment data fetched:", response.data);

      setAddPayment(response.data[0]);

      setSearchQuery(response.data[0].name);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;

    setSearchQuery(query);

    if (query) {
      const filtered = students.filter((student) =>
        student.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredStudents(filtered);
    } else {
      setFilteredStudents([]);
    }
  };

  const handleSelectStudent = (student) => {
    setAddPayment((prevPayment) => ({
      ...prevPayment,
      stud_id: student.id,
      name: student.name,
    }));
    setSearchQuery(student.name);
    setFilteredStudents([]);
  };

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddPayment((prevPayment) => ({
      ...prevPayment,
      [name]: value,
    }));
  };

  const handleAddPayment = async () => {
    try {
      const response = await axios.put(
        `http://localhost:4002/editpayment/${location.state.id}`,
        addPayment
      );
      console.log("Payment updated successfully:", response.data);
      navigate("/payment");
    } catch (error) {
      console.error("Error editing payment data:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Edit New Payment</h1>
          </div>

          <div className="addclan_input">
            <label>Student Name :</label>
            <br />
            <input
              type="text"
              placeholder="Search for student name"
              name="stud_id"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {searchQuery && filteredStudents.length > 0 && (
              <ul>
                {filteredStudents.map((student) => (
                  <li
                    key={student.id}
                    onClick={() => handleSelectStudent(student)}
                  >
                    {student.name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="addclan_input">
            <label>Amount :</label>
            <br />
            <input
              type="text"
              placeholder="Amount"
              name="amount"
              value={addPayment.amount || ""}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Type :</label>
            <br />
            <select
              name="type"
              value={addPayment.type || ""}
              onChange={handleChangeAdd}
            >
              <option value="">Select</option>
              <option value="Term 1">Term 1</option>
              <option value="Term 2">Term 2</option>
              <option value="Term 3">Term 3</option>
              <option value="Term 4">Term 4</option>
              <option value="Term 5">Term 5</option>
            </select>
          </div>

          <div className="addclan_input">
            <label>Due Date :</label>
            <br />
            <input
              type="date"
              name="due_date"
              value={addPayment.due_date || ""}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="addclan_input">
            <label>Description :</label>
            <br />
            <input
              type="text"
              name="description"
              value={addPayment.description || ""}
              onChange={handleChangeAdd}
            />
          </div>

          <div className="add_clan_btn">
            <button onClick={handleAddPayment}>Add Payment</button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default EditPayment;
