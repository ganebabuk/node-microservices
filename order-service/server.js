const app = require("./src/app");
const { consumeOrderRequests } = require("./rabbitmq/consumeOrderRequests");

const PORT = process.env.PORT || 5002;
app.listen(PORT, async () => {
  console.log(`Order Service running on port ${PORT}`);
  await consumeOrderRequests();
});
