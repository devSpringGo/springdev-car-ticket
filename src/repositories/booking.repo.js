
const pool = require("../config/db");
const sql = require("mssql");

exports.create = async ({ customerName, routeId, seatNumber }) => {
  const db = await pool;
  const result = await db.request()
    .input("customerName", sql.NVarChar, customerName)
    .input("routeId", sql.Int, routeId)
    .input("seatNumber", sql.Int, seatNumber)
    .query(`
      INSERT INTO Bookings (CustomerName, RouteId, SeatNumber)
      OUTPUT INSERTED.*
      VALUES (@customerName, @routeId, @seatNumber)
    `);
  return result.recordset[0];
};

exports.getById = async (id) => {
  const db = await pool;
  const result = await db.request()
    .input("id", sql.Int, id)
    .query("SELECT * FROM Bookings WHERE BookingID = 1");
  console.log(result);
  return result.recordset[0];
};
