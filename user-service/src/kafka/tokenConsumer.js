const { consumer } = require("../config/kafka");
const jwt = require("jsonwebtoken");

const consumeRenewedTokens = async () => {
  await consumer.subscribe({ topic: "token-renewal-response" });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const { newToken, email } = JSON.parse(message.value.toString());
      console.log(`Received new token for ${email}: ${newToken}`);
      // Store in a database/session storage if needed
    },
  });
};

module.exports = { consumeRenewedTokens };