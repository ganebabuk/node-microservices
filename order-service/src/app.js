const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const orderRoutes = require("./routes/order.routes");
const { consumeOrderRequests } = require("../rabbitmq/consumeOrderRequests");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/orders", orderRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

consumeOrderRequests();

module.exports = app;
