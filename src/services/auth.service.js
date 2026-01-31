const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepo = require("../repositories/user.repo");

exports.login = async (phone, password) => {
  const user = await userRepo.findByPhone(phone);
  if (!user) throw new Error("Số điện thoại hoặc mật khẩu không đúng");
  console.log(bcrypt.hashSync("hash_a", 10));
  const isMatch = await bcrypt.compare(password, user.PasswordHash);
  if (!isMatch) throw new Error("Số điện thoại hoặc mật khẩu không đúng");

  const token = jwt.sign(
    {
      id: user.Id,
      phone: user.Phone,
      role: user.Role
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );

  return {
    token,
    user: {
      id: user.Id,
      email: user.Email,
      fullName: user.FullName,
      role: user.Role
    }
  };
};
