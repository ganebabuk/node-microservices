const amqp = require("amqplib");

async function consumeUserRequests(email) {
  return new Promise(async (resolve, reject) => {
    try {
      console.log("consumeUserRequests called with email:", email);

      const connection = await amqp.connect(process.env.RABBITMQ_URL);
      const channel = await connection.createChannel();

      const requestQueue = "order_request_queue";
      const responseQueue = "order_response_queue";

      // Ensure queues exist
      await channel.assertQueue(requestQueue, { durable: false });
      await channel.assertQueue(responseQueue, { durable: false });

      console.log(`Sending RabbitMQ request for: ${email}`);

      // Send request to Order Service
      channel.sendToQueue(requestQueue, Buffer.from(JSON.stringify({ email })));

      // Listen for response from Order Service
      channel.consume(
        responseQueue,
        (msg) => {
          const orders = JSON.parse(msg.content.toString());
          console.log("Received orders from RabbitMQ:", orders);

          resolve(orders); // Resolve Promise with order data
          channel.ack(msg);
        },
        { noAck: false }
      );
    } catch (error) {
      console.error("RabbitMQ error:", error);
      reject(error);
    }
  });
}

module.exports = { consumeUserRequests };
