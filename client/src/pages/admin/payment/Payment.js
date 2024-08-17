import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import Delete from "../../../component/admin/CustomDelete";
const Payment = () => {
  const [payment, setpayment] = useState([]);

  useEffect(() => {
    fechpayment();
  }, []);

  const fechpayment = async () => {
    try {
      const res = await axios(`http://localhost:4002/getpaymentall`);
      setpayment(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  // delete data 
  const deletePayment = async (id) => {
    try {
      await axios.delete(`http://localhost:4002/deletePayment/${id}`);
      fechpayment();
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
          <NavLink to="/addpayment" className="btn-download">
            <i className="bx bx-plus"></i>
            <span className="text">Add Payment</span>
          </NavLink>
        </div>

        <div>
          <table className="rwd-table">
            <thead>
              <tr>
                <th>ID</th>
                <th> Name</th>
                <th>Amount</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {payment.map((data) => (
                <tr>
                  <td>{data.id}</td>
                  <td>{data.name}</td>
                  <td>{data.amount}</td>
                  <td>{data.type}</td>
                  <td>{data.due_date}</td>
                  <td>{data.description}</td>
                  <td className="clan_handle">
                    <Delete onDelete={() => deletePayment(data.id)} />
                    <NavLink to="/editpayment" state={{ id: data.id }}>
                      <button style={{ backgroundColor: "#3C91E6" }}>
                        <i className="fa-solid fa-pen-to-square"></i>
                      </button>
                    </NavLink>
                    <NavLink to="/print" state={{ id: data.id }}>
                      <button style={{ backgroundColor: "red" }}>
                        <i class="fa-solid fa-print"></i>
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
};

export default Payment;
