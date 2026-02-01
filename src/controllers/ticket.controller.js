const ticketService = require("../services/ticket.service");

exports.getByPhone = async (req, res) => {
  try {
    const { phone } = req.params;
    console.log("Received phone:", phone);
    if (!phone) {
      return res.status(400).json({
        message: "Số điện thoại không hợp lệ"
      });
    }

    const ticket = await ticketService.getByPhone(phone);

    if (!ticket) {
      return res.status(404).json({
        message: "Không tìm thấy vé với số điện thoại này"
      });
    }
    console.log("Found ticket:", ticket);
    return res.status(200).json({
      message: "Lấy thông tin vé thành công",
      data: ticket
    });

  } catch (error) {
    console.error("getByPhone error:", error);
    return res.status(500).json({
      message: "Lỗi hệ thống, vui lòng thử lại sau"
    });
  }
};
