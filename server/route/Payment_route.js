// File: route/Payment_route.js
const express = require("express");
const router = express.Router();
const paymentController = require("../controller/Payment");

router.get("/getpaymentall", paymentController.getpayment);
router.get("/getPaymentParID/:id", paymentController.getPaymentParID);
router.get("/getPaymentstdID/:id", paymentController.getPaymentstdID);
router.post("/addPayment", paymentController.addPayment);
router.put("/editpayment/:id", paymentController.editPayment);
router.delete("/deletePayment/:id", paymentController.deletePayment);
module.exports = router;
