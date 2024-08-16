import React, { useState } from "react";
import HOC from "../../../component/admin/HOC";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Add_student() {
  const Navigate = useNavigate();
  const [student, setstudent] = useState({
    name: "",
    middle_name: "",
    surname: "",
    email: "",
    mobile: "",
    father_mobail: "",
    adress: "",
    city: "",
    gender: "",
    profile_pic: null,
    registation_date: "",
  });
  console.log(student);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setstudent((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setstudent((prevData) => ({
      ...prevData,
      [name]: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", student.name);
      formData.append("middle_name", student.middle_name);
      formData.append("surname", student.surname);
      formData.append("email", student.email);
      formData.append("mobile", student.mobile);
      formData.append("father_mobail", student.father_mobail);
      formData.append("adress", student.adress);
      formData.append("city", student.city);
      formData.append("gender", student.gender);
      formData.append("profile_pic", student.profile_pic);
      formData.append("registation_date", student.registation_date);

      await axios.post(`http://localhost:4002/addStudent`, formData,);
      setstudent({
        name: "",
        middle_name: "",
        surname: "",
        email: "",
        mobile: "",
        father_mobail: "",
        adress: "",
        city: "",
        gender: "",
        profile_pic: null,
        registation_date: "",
      });
      Navigate("/student_registration");
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };

  return (
    <>
      <HOC />

      <section id="content">
        <main>
          <div className="form-container">
            <h2>Add Student</h2>
            <form onSubmit={handleSubmit} className="student-form">
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={student.name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="middle_name">Middle Name</label>
                <input
                  type="text"
                  id="middle_name"
                  name="middle_name"
                  value={student.middle_name}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="surname">Surname</label>
                <input
                  type="text"
                  id="surname"
                  name="surname"
                  value={student.surname}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={student.email}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={student.mobile}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="father_mobile">Father's Mobile</label>
                <input
                  type="tel"
                  id="father_mobail"
                  name="father_mobail"
                  value={student.father_mobail}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="address">Address</label>
                <input
                  type="text"
                  id="address"
                  name="adress"
                  value={student.adress}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={student.city}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="gender">Gender</label>
                <select
                  id="gender"
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="profile_pic">Image Path</label>
                <input
                  type="file"
                  id="profile_pic"
                  name="profile_pic"
                  onChange={handleFileChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="registration_date">Registration Date</label>
                <input
                  type="date"
                  id="registration_date"
                  name="registation_date"
                  value={student.registation_date}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
          </div>
        </main>
      </section>
    </>
  );
}

export default Add_student;
