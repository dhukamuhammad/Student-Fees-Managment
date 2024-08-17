import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddPayment = () => {
    const today = new Date().toISOString().split("T")[0]

    const [students, setStudents] = useState([]);
    // search
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const [addPayment, setAddPayment] = useState({
        stud_id: '',
        amount: '',
        type: '',
        due_date: today,
        description: '',
    });


    const navigate = useNavigate()

    useEffect(() => {
        fetchStudents();
    }, []);

    const fetchStudents = async () => {
        try {
            const response = await axios.get("http://localhost:4002/getstudent");
            setStudents(response.data);
            setFilteredStudents(response.data);
        } catch (error) {
            console.error("Error fetching student data:", error);
        }
    };

    // search data for student
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        const filtered = students.filter((student) =>
            student.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredStudents(filtered);
    };

    const handleSelectStudent = (student) => {
        console.log(student)
        setAddPayment((prevPayment) => ({
            ...prevPayment,
            stud_id: student.id,
        }));
        setSearchQuery(student.name);
        setFilteredStudents([]);
    };

    // add code
    const handleChangeAdd = (e) => {
        const { name, value } = e.target;
        setAddPayment((prevPayment) => ({
            ...prevPayment,
            [name]: value,
        }));
    };

    const handleAddPayment = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`http://localhost:4002/addPayment`, addPayment);
            setAddPayment({
                stud_id: '',
                amount: '',
                type: '',
                due_date: today,
                description: '',
            });
            navigate("/payment");
        } catch (error) {
            console.log("Error adding student:", error);
        }
    };

    // add code


    return (
        <section id="content">
            <main>
                <div className="add_clan">
                    <div className="add_clan_title">
                        <h1>Add New Payment</h1>
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
                            value={addPayment.amount}
                            onChange={handleChangeAdd}
                        />
                    </div>

                    <div className="addclan_input">
                        <label>Type :</label>
                        <br />
                        <select
                            name="type"
                            value={addPayment.type}
                            onChange={handleChangeAdd}
                            style={{width:"100%",padding:"12px",marginTop:"10px",marginBottom:"10px"}}
                        >
                            <option value="">Null</option>
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
                            placeholder="Due Date"
                            name="due_date"
                            value={addPayment.due_date}
                            onChange={handleChangeAdd}
                        />
                    </div>

                    <div className="addclan_input">
                        <label>Description :</label>
                        <br />
                        <input
                            type="text"
                            name="description"
                            value={addPayment.description}
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
};

export default AddPayment;
