
const express = require("express");
const cors = require("cors");
//swagger
const swaggerUi = require("swagger-ui-express"); // ⭐ THIẾU DÒNG NÀY
const swaggerSpec = require("./config/swagger");
//swagger end
const app = express();
app.use(cors({ origin: "https://springdev-car-ticket.onrender.com/" }));
app.use(express.json());
//swagger
app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
//add routes
app.use("/api/bookings", require("./routes/booking.routes"));
app.use("/api/auth", require("./routes/auth.routes"));
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});
module.exports = app;
