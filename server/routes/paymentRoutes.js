const express = require("express");
const router = express.Router();

const {
  createOrder,
  getOrder,
  payOrder
} = require("../controllers/paymentController");

router.post("/create-order", createOrder);
router.get("/order/:id", getOrder);
router.post("/pay", payOrder);

module.exports = router;