import React, { useEffect, useState } from "react";
import HOC from "../../../component/admin/HOC";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

function EditStudent() {

  const [student, setStudent] = useState({
    name: "",
    middle_name: "",
    surname: "",
    email: "",
    mobile: "",
    father_mobail: "",
    address: "",
    city: "",
    gender: "",
    profile_pic: "",
    registration_date: "",
  });

  const location = useLocation();
  const Navigate = useNavigate();


  useEffect(() => {
    if (location.state && location.state.id) {
      fetchStudentData(location.state.id);
    }
  }, [location.state]);

  const fetchStudentData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:4002/getperstudent/${id}`);
      const studentData = res.data[0];

      setStudent({
        name: studentData.name,
        middle_name: studentData.middle_name,
        surname: studentData.surname,
        email: studentData.email,
        mobile: studentData.mobile,
        father_mobail: studentData.father_mobail,
        address: studentData.adress,
        city: studentData.city,
        gender: studentData.gender,
        profile_pic: studentData.profile_pic || "", // Ensure profile_pic is not null
        registration_date: studentData.registation_date.split("T")[0],
      });
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // edite code 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setStudent((prevStudent) => ({
      ...prevStudent,
      [name]: files[0],
    }));
  };

  const handleSubmitEdit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", student.name);
      formData.append("middle_name", student.middle_name);
      formData.append("surname", student.surname);
      formData.append("email", student.email);
      formData.append("mobile", student.mobile);
      formData.append("father_mobail", student.father_mobail);
      formData.append("address", student.address);
      formData.append("city", student.city);
      formData.append("gender", student.gender);
      formData.append("profile_pic", student.profile_pic);
      formData.append("registation_date", student.registration_date);

      await axios.put(
        `http://localhost:4002/editStudent/${location.state.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }

      );
      Navigate("/student_registration");
    } catch (error) {
      console.error("Error editing student data:", error);
    }
  };

  return (
    <>
      {/*sidebar component */}
      <HOC />
      {/*sidebar component */}

      <section id="content">
        <main>
          <div className="form-container">
            <h2>Edit Student</h2>
            <form onSubmit={handleSubmitEdit} className="student-form">
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
                <label htmlFor="father_mobail">Father's Mobile</label>
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
                  name="address"
                  value={student.address}
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
                <label htmlFor="profile_pic">Profile Picture</label>
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
                  name="registration_date"
                  value={student.registration_date}
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

export default EditStudent;
