import React from "react";
import Student_academic from "../../pages/admin/student_Academin/Student_academic ";
import AddStudent_academic from "../../pages/admin/student_Academin/AddStudent_academic ";
import EditStudent_academic from "../../pages/admin/student_Academin/EditStudent_academic ";
import { Route, Routes } from "react-router-dom";
import HOC from "../../component/admin/HOC";

function Student_academic_routes() {
  return (
    <>
      <Routes>
        <Route
          exact
          path="/Student_academic"
          element={
            <><HOC />
              <Student_academic />
            </>
          }
        ></Route>
        <Route
          exact
          path="/AddStudent_academic"
          element={
            <><HOC />
              <AddStudent_academic />
            </>
          }
        ></Route>
        <Route
          exact
          path="/EditStudent_academic"
          element={
            <><HOC />
              <EditStudent_academic />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
}

export default Student_academic_routes;
