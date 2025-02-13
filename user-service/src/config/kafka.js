const { Kafka } = require("kafkajs");

const kafka = new Kafka({
  clientId: "auth-service",
  brokers: [process.env.KAFKA_BROKER],
});

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: "token-renewal-group" });

const connectKafka = async () => {
  await producer.connect();
  await consumer.connect();
};

module.exports = { kafka, producer, consumer, connectKafka };