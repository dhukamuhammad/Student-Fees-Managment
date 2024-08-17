import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import Delete from "../../../component/admin/CustomDelete";

function Student_academic() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudent_academic();
  }, []);

  const fetchStudent_academic = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/getStudent_academic"
      );
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // calulate data 
  const calculateApproxDate = (joinDate, duration) => {
    const jndate = new Date(joinDate.split("-").reverse().join("-"));
    let date = jndate.getDate();
    let month = jndate.getMonth() + duration;
    let year = jndate.getFullYear();

    if (month >= 12) {
      year += Math.floor(month / 12);
      month = month % 12;
    }

    return `${String(date).padStart(2, "0")}-${String(month + 1).padStart(
      2,
      "0"
    )}-${year}`;
  };

  // delete data 
  const deleteStudentAcademic = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/deleteAcademic/${id}`);
      fetchStudent_academic();
    } catch (error) {
      console.error("Error deleting clan:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div
          className="head-title"
          style={{ float: "right", marginBottom: "15px" }}
        >
          <NavLink to="/AddStudent_academic" className="btn-download">
            <i className="bx bx-plus"></i>
            <span className="text">Add Student Academic</span>
          </NavLink>
        </div>

        <div>
          <table className="rwd-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student Name</th>
                <th>Course Name</th>
                <th>Fess</th>
                <th>Joining Date</th>
                <th>Approx Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {students.map((data) => (
                <tr key={data.id}>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.course_name}</td>
                  <td>{data.fess}</td>

                  <td>{data.join_date}</td>
                  <td>{calculateApproxDate(data.join_date, data.duration)}</td>
                  <td className="clan_handle">
                    <Delete onDelete={() => deleteStudentAcademic(data.id)} />
                    <NavLink to="/EditStudent_academic" state={{ id: data.id }}>
                      <button style={{ backgroundColor: "#3C91E6" }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </section>
  );
}

export default Student_academic;
