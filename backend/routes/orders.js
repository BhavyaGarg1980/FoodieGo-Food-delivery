const router = require("express").Router();
const Order = require("../models/Order");

router.post("/", async (req, res) => {
  const { userId, items, totalAmount } = req.body;

  const order = new Order({ userId, items, totalAmount });
  await order.save();

  res.json({ message: "Order placed successfully" });
});

router.get("/", async (req, res) => {
  const orders = await Order.find();
  res.json(orders);
});

module.exports = router;