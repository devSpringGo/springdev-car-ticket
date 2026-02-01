/**
 * @swagger
 * tags:
 *   name: Ticket
 *   description: API tra cứu vé
 */

const router = require("express").Router();
const controller = require("../controllers/ticket.controller");

/**
 * @swagger
 * /api/ticket/phone/{phone}:
 *   get:
 *     summary: Tra cứu thông tin vé theo số điện thoại
 *     description: Lấy thông tin vé và chi tiết đặt vé dựa trên số điện thoại người dùng
 *     tags: [Ticket]
 *     parameters:
 *       - in: path
 *         name: phone
 *         required: true
 *         schema:
 *           type: string
 *           example: "0909123456"
 *         description: Số điện thoại dùng để tra cứu vé
 *     responses:
 *       200:
 *         description: Lấy thông tin vé thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Lấy thông tin vé thành công
 *                 data:
 *                   type: object
 *       404:
 *         description: Không tìm thấy vé với số điện thoại này
 *       400:
 *         description: Số điện thoại không hợp lệ
 *       500:
 *         description: Lỗi hệ thống
 */
router.get("/phone/:phone", controller.getByPhone);

module.exports = router;
