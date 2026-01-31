const authService = require("../services/auth.service");

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    if (!phone || !password) {
      return res.status(400).json({ message: "Phone và mật khẩu là bắt buộc" });
    }

    const result = await authService.login(phone, password);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

