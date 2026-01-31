/**
 * @swagger
 * tags:
 *   name: Booking
 *   description: API đặt vé
 */

const router = require("express").Router();
const controller = require("../controllers/booking.controller");
/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Tạo vé xe
 *     tags: [Booking]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               customerName:
 *                 type: string
 *               routeId:
 *                 type: integer
 *               seatNumber:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tạo vé thành công
 */
router.post("/", controller.createBooking);
router.get("/:id", controller.getBookingById);

module.exports = router;
