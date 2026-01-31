
const repo = require("../repositories/booking.repo");

exports.createBooking = (data) => {
  return repo.create(data);
};

exports.getBookingById = (id) => {
  return repo.getById(id);
};
