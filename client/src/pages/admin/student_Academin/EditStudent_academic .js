import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function EditStudentAcademic() {
  const [editAcademic, setEditAcademic] = useState({
    s_id: "",
    c_id: "",
    name: "",
    course_name: "",
    join_date: "",
    fess:"",
    finished_date: "",
  });

  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseSearchQuery, setCourseSearchQuery] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAcademic(location.state.id);
    fetchStudents();
    fetchCourses();
  }, [location.state.id]);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4002/getstudent");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4002/getCourseDetails"
      );
      setCourses(response.data);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const fetchAcademic = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:4002/getPerAcademic/${id}`
      );
      setEditAcademic(response.data[0]);
      setSearchQuery(response.data[0].name);
      setCourseSearchQuery(response.data[0].course_name);
    } catch (error) {
      console.error("Error fetching academic data:", error);
    }
  };

  const handleChangeEdit = (e) => {
    const { name, value } = e.target;
    setEditAcademic((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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
    setEditAcademic((prevData) => ({
      ...prevData,
      s_id: student.id,
      name: student.name,
    }));
    setSearchQuery(student.name);
    setFilteredStudents([]);
  };

  const handleCourseSearchChange = (e) => {
    const query = e.target.value;
    setCourseSearchQuery(query);

    if (query) {
      const filtered = courses.filter((course) =>
        course.course_name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCourses(filtered);
    } else {
      setFilteredCourses([]);
    }
  };

  const handleSelectCourse = (course) => {
    setEditAcademic((prevData) => ({
      ...prevData,
      c_id: course.id,
      course_name: course.course_name,
      // fess:course.fees
    }));
    setCourseSearchQuery(course.course_name);
    setFilteredCourses([]);
  };

  const handleEditAcademic = async () => {
    try {
      await axios.put(
        `http://localhost:4002/editAcademic/${location.state.id}`,
        editAcademic
      );
      navigate("/Student_academic");
    } catch (error) {
      console.error("Error editing academic data:", error);
    }
  };

  return (
    <section id="content">
      <main>
        <div className="add_clan">
          <div className="add_clan_title">
            <h1>Edit Academic Record</h1>
          </div>

          <div className="addclan_input">
            <label>Student Name:</label>
            <br />
            <input
              type="text"
              placeholder="Search for student name"
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
            <label>Course Name:</label>
            <br />
            <input
              type="text"
              placeholder="Search for course name"
              value={courseSearchQuery}
              onChange={handleCourseSearchChange}
            />
            {courseSearchQuery && filteredCourses.length > 0 && (
              <ul>
                {filteredCourses.map((course) => (
                  <li
                    key={course.id}
                    onClick={() => handleSelectCourse(course)}
                  >
                    {course.course_name}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="addclan_input">
            <label>Join Date:</label>
            <br />
            <input
              type="date"
              name="join_date"
              value={editAcademic.join_date}
              onChange={handleChangeEdit}
            />
          </div>

          <div className="addclan_input">
            <label>Finished Date:</label>
            <br />
            <input
              type="date"
              name="finished_date"
              value={editAcademic.finished_date}
              onChange={handleChangeEdit}
            />
          </div>
          <div className="addclan_input">
            <label>fess:</label>
            <br />
            <input
              type="text"
              name="fess"
              value={editAcademic.fess}
              onChange={handleChangeEdit}
              // disabled
            />
          </div>

          <div className="add_clan_btn">
            <button onClick={handleEditAcademic}>Save Changes</button>
          </div>
        </div>
      </main>
    </section>
  );
}

export default EditStudentAcademic;
