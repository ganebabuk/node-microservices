const app = require("./src/app");
const { consumeUserRequests } = require("./rabbitmq/consumeUserRequests");

const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  console.log(`User Service running on port ${PORT}`);
  // await consumeUserRequests();
});
