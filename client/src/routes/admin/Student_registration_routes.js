import React from "react";
import { Routes, Route } from "react-router-dom";
import Student_registration from "../../pages/admin/student_registration/Student_registration";
import Add_student from "../../pages/admin/student_registration/Add_student";
import Edit_student from "../../pages/admin/student_registration/Edit_student";
function Student_registration_routes() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/student_registration"
          element={
            <>
              <Student_registration />
            </>
          }
        ></Route>
        <Route
          exact
          path="/Addstudent"
          element={
            <>
              <Add_student/>
            </>
          }
        ></Route>
           <Route
          exact
          path="/editstudent"
          element={
            <>
              <Edit_student/>
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default Student_registration_routes;
