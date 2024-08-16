import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'



const EditCourseDetails = () => {
    const [editcourse, seteditcourse] = useState({
        course_name: "",
        description: "",
        fees: "",
        duration: ""
    })

    const location = useLocation();
    const navigate = useNavigate()


    useEffect(() => {
        fetchperCourseDetails(location.state.id)
    }, [location.state.id])

    const fetchperCourseDetails = async (id) => {
        try {
            const res = await axios.get(`http://localhost:4002/getPerCourseDetails/${id}`);
            seteditcourse(res.data[0]);

        } catch (error) {
            console.error("Error fetching per member data:", error);
        }
    };

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        seteditcourse((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleEditeCourseDetails = async () => {
        try {
            await axios.put(`http://localhost:4002/editCourseDetails/${location.state.id}`, editcourse);
            navigate("/coursedetails");
        } catch (error) {
            console.error("Error editing member data:", error);
        }
    };


    return (
        <section id='content'>
            <main>
                <div className='add_clan'>
                    <div className='add_clan_title'>
                        <h1>Edit New Course</h1>
                    </div>

                    <div className='addclan_input'>
                        <label>Course Name :</label><br />
                        <input type='text' placeholder='Course Name'
                            name='course_name' value={editcourse.course_name} onChange={handleChangeEdit}
                        />
                    </div>

                    <div className='addclan_input'>
                        <label>Description :</label><br />
                        <input type='text' placeholder='Description'
                            name='description' value={editcourse.description} onChange={handleChangeEdit}
                        />
                    </div>

                    <div className='addclan_input'>
                        <label>Fees :</label><br />
                        <input type='text' placeholder='Fees'
                            name='fees' value={editcourse.fees} onChange={handleChangeEdit}
                        />
                    </div>

                    <div className='addclan_input'>
                        <label>Duration :</label><br />
                        <input type='text' placeholder='Duration'
                            name='duration' value={editcourse.duration} onChange={handleChangeEdit}
                        />
                    </div>


                    <div className='add_clan_btn'>
                        <button
                        onClick={handleEditeCourseDetails}
                        >Edit Course</button>
                    </div>
                </div>
            </main>
        </section>

    )
}

export default EditCourseDetails
