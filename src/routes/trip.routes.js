const router = require("express").Router();
const controller = require("../controllers/trip.controller");

/**
 * @swagger
 * tags:
 *   - name: Trip
 *     description: API chuyến đi
 */

/**
 * @swagger
 * /api/trip:
 *   get:
 *     summary: Lấy danh sách chuyến đi
 *     description: Lấy danh sách các chuyến đi dựa trên điểm đi và điểm đến
 *     tags: [Trip]
 *     parameters:
 *       - in: query
 *         name: from
 *         required: true
 *         schema:
 *           type: string
 *         example: "Hà Nội"
 *         description: Tên điểm đi
 *       - in: query
 *         name: to
 *         required: true
 *         schema:
 *           type: string
 *         example: "Đà Nẵng"
 *         description: Tên điểm đến
 *     responses:
 *       200:
 *         description: Lấy danh sách chuyến đi thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lấy danh sách chuyến đi thành công"
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       TripId:
 *                         type: integer
 *                         example: 1
 *                       Price:
 *                         type: number
 *                         example: 150000
 *                       From:
 *                         type: string
 *                         example: "Hà Nội"
 *                       To:
 *                         type: string
 *                         example: "Đà Nẵng"
 *                       CompanyName:
 *                         type: string
 *                         example: "Công ty xe khách ABC"
 *                       Description:
 *                         type: string
 *                         example: "Xe giường nằm chất lượng cao"
 *                       LicensePlate:
 *                         type: string
 *                         example: "29B-12345"
 *                       AvailableSeats:
 *                         type: integer
 *                         example: 20
 *       500:
 *         description: Lỗi hệ thống
 */

router.get("/", controller.getListTrips);

module.exports = router;
