const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const app = require("./src/app"); // Keep this as you requested

const PORT = process.env.PORT || 5002;

// Swagger definition
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Node.js API with Swagger",
      version: "1.0.0",
      description: "Simple API documentation",
    },
    servers: [{ url: `http://localhost:${PORT}` }],
  },
  apis: ["./src/routes/*.js"], // Ensure this path matches your structure
};

// Initialize Swagger
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Import RabbitMQ Consumer
const { consumeOrderRequests } = require("./rabbitmq/consumeOrderRequests");

// Start server with RabbitMQ consumer
(async () => {
  await consumeOrderRequests();
  app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
    console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
  });
})();
