const { producer } = require("../config/kafka");

const requestTokenRenewal = async (expiredToken) => {
  await producer.send({
    topic: "token-renewal-request",
    messages: [{ value: JSON.stringify({ expiredToken }) }],
  });
};

module.exports = { requestTokenRenewal };
