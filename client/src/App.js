import React from "react";
import DashboardRoute from "./routes/admin/DashboardRoute";
import Student_registration_routes from "./routes/admin/Student_registration_routes";
import Student_academic_routes from "./routes/admin/Student_academic_routes ";
import CourseDetailsRoute from "./routes/admin/CourseDetailsRoute";
import PaymentRoute from "./routes/admin/PaymentRoute";

const App = () => {
  return (
    <>
      <DashboardRoute />
      <Student_registration_routes />
      <Student_academic_routes />
      <CourseDetailsRoute />
      <PaymentRoute />
    </>
  );
};

export default App;
