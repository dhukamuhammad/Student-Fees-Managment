import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function AddStudent_academic() {
  const [course, setcourse] = useState([]);
  const [students, setStudents] = useState([]);

  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filteredCourses, setFilteredCourses] = useState([]);
  const [courseSearchQuery, setCourseSearchQuery] = useState("");
  const [addcourse, setAddCourse] = useState({
    s_id: "",
    c_id: "",
    fess: "",
    join_date: new Date().toISOString().split("T")[0],
    finished_date: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    fetchStudents();
    fetchCourseDetails();
  }, []);

  // <=============== fetchStudents  ====================>
  const fetchStudents = async () => {
    try {
      const response = await axios.get("http://localhost:4002/getstudent");
      setStudents(response.data);
      setFilteredStudents(response.data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  // <=============== fetchCourseDetails  ====================>
  const fetchCourseDetails = async () => {
    try {
      const res = await axios("http://localhost:4002/getCourseDetails");
      setcourse(res.data);
      setFilteredCourses(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeAdd = (e) => {
    const { name, value } = e.target;
    setAddCourse((prevCourse) => ({
      ...prevCourse,
      [name]: value,
    }));
  };

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    const filtered = students.filter((student) =>
      student.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredStudents(filtered);
  };

  const handleSelectStudent = async (student) => {
    // console.log(student);

    setAddCourse((prevCourse) => ({
      ...prevCourse,
      s_id: student.id,
    }));
    setSearchQuery(student.name);
    setFilteredStudents([]);
  };

  const handleCourseSearchChange = (e) => {
    const query = e.target.value;
    setCourseSearchQuery(query);

    const filtered = course.filter((course) =>
      course.course_name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCourses(filtered);
  };

  const handleSelectCourse = (course) => {
    setAddCourse((prevCourse) => ({
      ...prevCourse,
      c_id: course.id,
      fess: course.fees,
    }));

    setCourseSearchQuery(course.course_name);
    setFilteredCourses([]);
  };

  const handleAddCourse = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:4002/addAcademic`, addcourse);
      setAddCourse({
        s_id: "",
        c_id: "",
        fess: "",
        join_date: "",
        finished_date: "",
      });
      navigate("/Student_academic");
    } catch (error) {
      console.log("Error adding student:", error);
    }
  };

  return (
    <>
      <section id="content">
        <main>
          <div className="add_clan">
            <div className="add_clan_title">
              <h1>Add New Course</h1>
            </div>

            <div className="addclan_input">
              <label>Student Name :</label>
              <br />
              <input
                type="text"
                placeholder="Search for student name"
                name="s_id"
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
              <label>Course Name :</label>
              <br />
              <input
                type="text"
                placeholder="Search for course name"
                name="c_id"
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
              <label>join_date :</label>
              <br />
              <input
                type="date"
                placeholder="Join Date"
                name="join_date"
                value={addcourse.join_date}
                onChange={handleChangeAdd}
              />
            </div>

            <div className="addclan_input">
              <label>finished_date :</label>
              <br />
              <input
                type="date"
                name="finished_date"
                value={addcourse.finished_date}
                onChange={handleChangeAdd}
              />
            </div>

            <div className="addclan_input">
              <label>fess:</label>
              <br />
              <input
                type="text"
                name="fess"
                value={addcourse.fess}
                onChange={handleChangeAdd}
                disabled
              />
            </div>

            <div className="add_clan_btn">
              <button onClick={handleAddCourse}>Add Course</button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default AddStudent_academic;
