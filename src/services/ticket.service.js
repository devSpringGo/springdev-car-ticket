
const repo = require("../repositories/ticket.repo");

exports.getByPhone = (phone) => {
  return repo.GetTicketByPhone(phone);
};
