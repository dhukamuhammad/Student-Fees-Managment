import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "../../../assets/css/print.css"

function Print() {
  const location = useLocation();
  const [print, setPrint] = useState({});
  const [course, setCourse] = useState({});
  const [printstd, setprintstd] = useState([]);
  const [totalAmount, setTotalAmount] = useState([]);

  const total = course.fess - totalAmount;

  useEffect(() => {
    fetchPayment(location.state.id);
    if (print.stud_id) {
      fetchCourse(print.stud_id);
      fetchstdpayment(print.stud_id);
    }
  }, [location.state.id, print.stud_id]);

  const fetchPayment = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4002/getPaymentParID/${id}`);
      setPrint(response.data[0]);
    } catch (error) {
      console.error("Error fetching payment data:", error);
    }
  };

  const fetchstdpayment = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4002/getPaymentstdID/${id}`);
      const data = response.data;
      setprintstd(data);

      const totalAmount = data.reduce((acc, item) => acc + item.amount, 0);
      setTotalAmount(totalAmount);
    } catch (error) {
      console.error("Error fetching student payment data:", error);
    }
  };

  const fetchCourse = async (stud_id) => {
    try {
      const response = await axios.get(`http://localhost:4002/getPercourse/${stud_id}`);
      setCourse(response.data[0]);
    } catch (error) {
      console.error("Error fetching course data:", error);
    }
  };

  const handlePrint = () => {
    const input = document.getElementById("content-to-print");
    const printButton = document.querySelector(".btn-print-download");

    printButton.style.display = "none";

    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a5",
      });
      const imgWidth = 148;
      const pageHeight = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, heightLeft - imgHeight, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save("download.pdf");
    });

    printButton.style.display = "block";
  };

  return (
    <>
      <section id="content">
        <main>
          <div className="container fade-in-up" id="content-to-print">
            <div className="header">
              <img src={require('../../../assets/images/download.png')} style={{width:"120px"}} />
            </div>

            <div className="customer-info">
              <div>
                <strong>Student Name:</strong> {print.name}
              </div>
              <div>
                <strong>Course:</strong> {course.course_name}
              </div>
              <div>
                <strong>From:</strong> 01-Jul-24
              </div>
            </div>

            <div className="summary">
              <div className="summary-item">
                <div>Total Fees</div>
                <strong>₹{course.fess}.00</strong>
              </div>
              <div className="summary-item">
                <div>Total Paid</div>
                <strong className="green-text">₹{totalAmount}.00</strong>
              </div>
              <div className="summary-item">
                <div>Total Due</div>
                <strong className="red-text">₹{total}.00</strong>
              </div>
            </div>

            <table>
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Date</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {printstd.map((data, index) => (
                  <tr key={index}>
                    <td>{data.type}</td>
                    <td>{data.due_date}</td>
                    <td>{data.amount}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="2">
                    <strong>Final Balance</strong>
                  </td>
                  <td className="blue-text">
                    <strong>₹{totalAmount}.00</strong>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="payment-detail">
              <h3>Payment Detail:</h3>
              <div style={{display:"flex", gap:"30px",alignItems:"center"}}>
                <div className="qr-code">
                  <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Doe%20John%0ABank%3A%20HDFC%0AAC%20No%3A%204003830171874018%0AIFSC%3A%20HDFC09112" alt="QR Code for payment details" width="150" height="150" />
                </div>
                <div className="payment-info">
                  <div>
                    <strong>Account Name:</strong> Doe John
                  </div>
                  <div>
                    <strong>Bank:</strong> HDFC
                  </div>
                  <div>
                    <strong>Account Number:</strong> 400383017187401B
                  </div>
                  <div>
                    <strong>IFSC:</strong> HDFC09112
                  </div>
                </div>
              </div>

            </div>

            <div>
              <button className="btn-print-download" onClick={handlePrint}>
                Print
              </button>
            </div>
          </div>
        </main>
      </section>
    </>
  );
}

export default Print;
