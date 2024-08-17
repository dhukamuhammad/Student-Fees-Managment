import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const AddCourseDetails = () => {
    const [addcourse, setaddcourse] = useState({
        course_name: "",
        description: "",
        fees: "",
        duration: ""
    })

    const navigate = useNavigate()

    // add code 
    const handleChangeAdd = (e) => {
        const { name, value } = e.target;
        setaddcourse((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleAddCourse = async () => {
        try {
            await axios.post(`http://localhost:4002/addCourseDetails`, addcourse)
            setaddcourse({
                course_name: "",
                description: "",
                fees: "",
                duration: ""
            })
            navigate("/coursedetails")
        } catch (error) {
            console.error("Error fetching clan data:", error)
        }
    }
    // add code 

    return (
        <section id='content'>
            <main>
                <div className='add_clan'>
                    <div className='add_clan_title'>
                        <h1>Add New Course</h1>
                    </div>

                    <div className='addclan_input'>
                        <label>Course Name :</label><br />
                        <input type='text' placeholder='Course Name'
                            name='course_name' value={addcourse.course_name} onChange={handleChangeAdd}
                        />
                    </div>

                    <div className='addclan_input'>
                        <label>Description :</label><br />
                        <input type='text' placeholder='Description'
                            name='description' value={addcourse.description} onChange={handleChangeAdd}
                        />
                    </div>

                    <div className='addclan_input'>
                        <label>Fees :</label><br />
                        <input type='text' placeholder='Fees'
                            name='fees' value={addcourse.fees} onChange={handleChangeAdd}
                        />
                    </div>

                    <div className='addclan_input'>
                        <label>Duration :</label><br />
                        <input type='text' placeholder='Duration'
                            name='duration' value={addcourse.duration} onChange={handleChangeAdd}
                        />
                    </div>


                    <div className='add_clan_btn'>
                        <button
                            onClick={handleAddCourse}
                        >Add Course</button>
                    </div>
                </div>
            </main>
        </section>
    )
}

export default AddCourseDetails
