const Order = require("../models/order.model");

// Get orders by user email
exports.getOrdersByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const orders = await Order.find({ userEmail: email });

    if (orders.length === 0) return res.status(404).json({ message: "No orders found" });

    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};
