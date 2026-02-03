const swaggerJsdoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Bus Booking API",
      version: "1.0.0",
      description: "API đặt vé xe khách"
    },
    servers: [
      {
        url: "https://springdev-car-ticket.onrender.com",
        //url1: "http://localhost:5000",
        description: "Main Server"
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    },
    security: [{ BearerAuth: [] }]
  },
  apis: ["./src/routes/*.js"] 
};

module.exports = swaggerJsdoc(options);
