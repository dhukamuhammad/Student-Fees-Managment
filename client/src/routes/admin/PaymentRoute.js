import React from "react";
import { Route, Routes } from "react-router-dom";
import HOC from "../../component/admin/HOC";
import Payment from "../../pages/admin/payment/Payment";
import AddPayment from "../../pages/admin/payment/AddPayment";
import EditPayment from "../../pages/admin/payment/EditPayment";
import Print from "../../pages/admin/payment/Print";

const PaymentRoute = () => {
  return (
    <>
      <Routes>
        <Route
          path="/payment"
          element={
            <>
              <HOC />
              <Payment />
            </>
          }
        />

        <Route
          path="/addpayment"
          element={
            <>
              <HOC />
              <AddPayment />
            </>
          }
        />
        <Route
          path="/EditPayment"
          element={
            <>
              <HOC />
              <EditPayment />
            </>
          }
        />
        <Route
          path="/print"
          element={
            <>
              <HOC />
              <Print />
            </>
          }
        />
      </Routes>
    </>
  );
};

export default PaymentRoute;
