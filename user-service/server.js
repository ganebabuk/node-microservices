// const app = require("./src/app");

// const PORT = process.env.PORT || 5001;
// app.listen(PORT, async () => {
//   console.log(`User Service running on port ${PORT}`);
// });
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

// Start server with RabbitMQ consumer
app.listen(PORT, () => {
  console.log(`User Service running on port ${PORT}`);
  console.log(`Swagger docs at http://localhost:${PORT}/api-docs`);
});

