const amqp = require("amqplib");
const Order = require("../src/models/order.model");

const RABBITMQ_URL = process.env.RABBITMQ_URL;

async function consumeOrderRequests() {
  const connection = await amqp.connect(RABBITMQ_URL);
  const channel = await connection.createChannel();

  // Ensure order request queue exists
  const requestQueue = "order_request_queue";
  await channel.assertQueue(requestQueue, { durable: false });

  // Ensure order response queue exists
  const responseQueue = "order_response_queue";
  await channel.assertQueue(responseQueue, { durable: false });

  console.log("Order Service: Waiting for order requests...");

  channel.consume(requestQueue, async (msg) => {
    const { email } = JSON.parse(msg.content.toString());
    console.log(`Received request for orders of: ${email}`);

    try {
      const orders = await Order.find({ userEmail: email });
      console.log("Orders found:", orders);

      // Send response back to the response queue
      channel.sendToQueue(responseQueue, Buffer.from(JSON.stringify(orders)));
    } catch (error) {
      console.error("Error fetching orders:", error);
    }

    channel.ack(msg);
  });
}

module.exports = { consumeOrderRequests };
