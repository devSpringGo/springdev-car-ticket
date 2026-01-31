const router = require("express").Router();
const controller = require("../controllers/auth.controller");
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Đăng nhập bằng số điện thoại
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *               - password
 *             properties:
 *               phone:
 *                 type: string
 *                 example: "090000001"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Login thành công
 *       401:
 *         description: Sai thông tin đăng nhập
 */
router.post("/login", controller.login);

module.exports = router;
