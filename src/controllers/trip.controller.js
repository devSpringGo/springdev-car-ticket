const tripService = require("../services/trip.service");

exports.getListTrips = async (req, res) => {
  try {
    const { from, to } = req.query;

    if (!from || !to) {
      return res.status(400).json({
        success: false,
        message: "Thiếu tham số from hoặc to"
      });
    }

    const trips = await tripService.getListTrips(from, to);

    if (!trips || trips.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Không tìm thấy chuyến xe phù hợp",
        data: []
      });
    }

    return res.status(200).json({
      success: true,
      message: "Lấy danh sách chuyến đi thành công",
      data: trips
    });

  } catch (error) {
    console.error("[TripController][getListTrips]", error);

    return res.status(500).json({
      success: false,
      message: "Lỗi hệ thống, vui lòng thử lại sau"
    });
  }
};
