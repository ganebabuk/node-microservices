const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  userEmail: String,
  items: [
    {
      productName: String,
      quantity: Number,
      price: Number,
    },
  ],
  totalAmount: Number,
  orderDate: { type: Date, default: Date.now },
  status: String,
},{ collection: 'order' });

module.exports = mongoose.model("order", orderSchema);
