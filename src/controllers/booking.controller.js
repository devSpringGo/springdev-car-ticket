
const service = require("../services/booking.service");

exports.createBooking = async (req, res) => {
  const booking = await service.createBooking(req.body);
  res.status(201).json(booking);
};

exports.getBookingById = async (req, res) => {
  const booking = await service.getBookingById(req.params.id);
  if (!booking) return res.sendStatus(404);
  res.json(booking);
};
