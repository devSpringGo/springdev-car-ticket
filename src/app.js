
const express = require("express");
const cors = require("cors");
//swagger
const swaggerUi = require("swagger-ui-express"); // ⭐ THIẾU DÒNG NÀY
const swaggerSpec = require("./config/swagger");
//swagger end
const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());
//swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//add routes
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/auth", require("./routes/auth.routes"));

module.exports = app;
