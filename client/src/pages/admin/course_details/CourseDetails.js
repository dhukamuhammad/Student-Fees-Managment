import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
// import PORT from '../../../assets/constant/URL'
import Delete from '../../../component/admin/CustomDelete'

const CourseDetails = () => {
    const [course, setcourse] = useState([])

    useEffect(() => {
        fetchCourseDetails()
    }, [])

    const fetchCourseDetails = async () => {
        try {
            const res = await axios(`http://localhost:4002/getCourseDetails`)
            setcourse(res.data)
        } catch (error) {
            console.log(error)
        }
    }

    const deleteCourseDetails = async (id) => {
        try {
            await axios.delete(`http://localhost:4002/deleteCourse/${id}`);
            fetchCourseDetails();
        } catch (error) {
            console.error("Error deleting clan:", error);
        }
    }
    return (
        <>
            <section id="content">
                <main>
                    <div className="head-title" style={{ float: "right", marginBottom: "15px" }}>
                        <NavLink to="/addcoursedetails" className="btn-download" >
                            <i className="bx bx-plus"></i>
                            <span className="text">Add Course</span>
                        </NavLink>
                    </div>

                    <div>
                        <table className="rwd-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Course Name</th>
                                    <th>Description</th>
                                    <th>Fees</th>
                                    <th>Duration</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {course.map((data) => (

                                    <tr>
                                        <td>{data.id}</td>
                                        <td>{data.course_name}</td>
                                        <td>{data.description}</td>
                                        <td>{data.fees}</td>
                                        <td>{data.duration}</td>
                                        <td className='clan_handle'>
                                            <Delete onDelete={() => deleteCourseDetails(data.id)} />
                                            <NavLink to="/editecoursedetails" state={{ id: data.id }}>
                                                <button style={{ backgroundColor: "#3C91E6" }}><i className="fa-solid fa-pen-to-square"></i></button>
                                            </NavLink>

                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </main>
            </section>
        </>
    )
}

export default CourseDetails
