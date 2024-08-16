import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import HOC from "../../../component/admin/HOC";
import "../../../assets/css/Student.css";
import { NavLink } from "react-router-dom";
import Delete from "../../../component/admin/CustomDelete";

function Student_registration() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4002/getstudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };
  const deleteStudent = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/deletestudent/${id}`);
      fetchStudents();
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  return (
    <>
      <HOC />

      <section id="content">
        <main>
          <div
            className="head-title"
            style={{ float: "right", marginBottom: "15px" }}
          >
            <NavLink to="/Addstudent" className="btn-download">
              <i className="bx bx-plus"></i>
              <span className="text">Add Student</span>
            </NavLink>
          </div>

          <div>
            <table className="rwd-table">
              <thead>
                <tr>
                  <th>Profile Pic</th>
                  <th>Name</th>
                  <th>Gender</th>
                  <th>Address</th>

                  <th>Registration Date</th>
                  <th>Action</th>

                  <th></th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td>
                      {student.profile_pic && (
                        <img
                          src={`/upload/${student.profile_pic}`}
                          alt="Profile Pic"
                          style={{ width: "50px", height: "50px" }}
                        />
                      )}
                    </td>
                    <td>
                      {student.name}

                      {student.middle_name}
                      {student.surname}
                    </td>
                    <td>{student.gender}</td>

                    <td>{student.adress}</td>

                    <td>{student.registation_date}</td>
                    <td className="clan_handle">
                      <NavLink to="/editstudent" state={{ id: student.id }}>
                        <button style={{ backgroundColor: "#3C91E6" }}>
                          <i className="fa-solid fa-pen-to-square"></i>
                        </button>
                      </NavLink>
                      <Delete onDelete={() => deleteStudent(student.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
      </section>
    </>
  );
}

export default Student_registration;
