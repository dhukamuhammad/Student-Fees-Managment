import React from "react";
import { Route, Routes } from "react-router-dom";
import HOC from "../../component/admin/HOC";
import CourseDetails from "../../pages/admin/course_details/CourseDetails";
import AddCourseDetails from "../../pages/admin/course_details/AddCourseDetails";
import EditCourseDetails from "../../pages/admin/course_details/EditCourseDetails";

const CourseDetailsRoute = () => {
  return (
    <div>
      <Routes>
        <Route
          path="/coursedetails"
          element={
            <>
              <HOC />
              <CourseDetails />
            </>
          }
        />

        <Route
          path="/addcoursedetails"
          element={
            <>
              <HOC />
              <AddCourseDetails />
            </>
          }
        />

        <Route
          path="/editecoursedetails"
          element={
            <>
              <HOC />
              <EditCourseDetails />
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default CourseDetailsRoute;
