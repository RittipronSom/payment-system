const db = require("../config/db");

// ✅ 1. สร้าง order
exports.createOrder = (req, res) => {
  const { amount } = req.body;

  const sql = "INSERT INTO orders (total, status) VALUES (?, 'pending')";

  db.query(sql, [amount], (err, result) => {
    if (err) return res.status(500).send(err);

    res.send({
      id: result.insertId,
      total: amount,
      status: "pending"
    });
  });
};

// ✅ 2. ดึง orderดกดกดกดกดกดกดก
exports.getOrder = (req, res) => {
  const id = req.params.id;

  db.query("SELECT * FROM orders WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.status(404).send({ error: "Order not found" });

    res.send(result[0]);
  });
};

// ✅ 3. จ่ายเงิน (สำคัญสุด)
exports.payOrder = (req, res) => {
  const { orderId } = req.body;

  // 🔹 1. ดึง order มาก่อน
  db.query("SELECT * FROM orders WHERE id = ?", [orderId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.length === 0) return res.send({ success: false });

    const order = result[0];

    // 🔹 2. สร้าง payment
    const insertPayment = `
      INSERT INTO payments (order_id, amount, status)
      VALUES (?, ?, 'success')
    `;

    db.query(insertPayment, [order.id, order.total], (err2) => {
      if (err2) return res.status(500).send(err2);

      // 🔹 3. update order
      db.query(
        "UPDATE orders SET status = 'success' WHERE id = ?",
        [order.id],
        (err3) => {
          if (err3) return res.status(500).send(err3);

          res.send({ success: true });
        }
      );
    });
  });
};