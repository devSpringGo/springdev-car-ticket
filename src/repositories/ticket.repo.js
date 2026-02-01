
const pool = require("../config/db");
const sql = require("mssql");

exports.GetTicketByPhone = async (phone) => {
  const db = await pool;

  const result = await db.request()
    .input('phone', sql.NVarChar, phone.trim())
    .query(`
      Select B.BookingId, A.FullName, A.Phone, A.Email, K.SeatNumber, B.Status
      , F.LocationName as [From], G.LocationName as [To]
      , B.BookingDate, I.CompanyName, I.Description
      , Sum(C.Price) [Sum]
      from Users A
      inner join Bookings B on A.UserId = B.UserId
      inner join BookingDetails C on B.BookingId = C.BookingId
      inner join Trips D on B.TripId = D.TripId
      inner join Routes E on D.RouteId = E.RouteId
      inner join Locations F on E.FromLocationId = F.LocationId
      inner join Locations G on E.ToLocationId = G.LocationId
      inner join Buses H on D.BusId = H.BusId
      inner join BusCompanies I on H.CompanyId = I.CompanyId
      inner join Seats K on H.BusId = K.BusId and C.SeatId = K.SeatId
      WHERE A.Phone = @phone
      Group by A.FullName, A.Phone, A.Email, K.SeatNumber
      , F.LocationName, G.LocationName
      , B.BookingDate, H.BusId, I.CompanyName, I.Description
      , C.Price, B.Status, B.BookingId
    `);

  return result.recordset[0];
};
