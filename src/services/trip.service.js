const repo = require("../repositories/trip.repo");

exports.getListTrips = (from, to) => {
  return repo.GetListTrips(from, to);
};