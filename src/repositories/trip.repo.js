
const pool = require("../config/db");
const sql = require("mssql");

exports.GetListTrips = async (from, to) => {
  const db = await pool;
    const result = await db.request()
    .input('FromLocation', sql.NVarChar, from)
    .input('ToLocation', sql.NVarChar, to)
    .query(`
        SELECT  
            A.TripId,
            A.Price,
            C.LocationName AS [From],
            D.LocationName AS [To],
            F.CompanyName,
            F.Description,
            E.LicensePlate,
            COUNT(S.SeatId) AS AvailableSeats
        FROM Trips A
        INNER JOIN Routes B ON A.RouteId = B.RouteId
        INNER JOIN Locations C ON B.FromLocationId = C.LocationId
        INNER JOIN Locations D ON B.ToLocationId = D.LocationId
        INNER JOIN Buses E ON A.BusId = E.BusId
        INNER JOIN BusCompanies F ON E.CompanyId = F.CompanyId
        INNER JOIN Seats S ON E.BusId = S.BusId
        LEFT JOIN BookingDetails BD 
            ON BD.SeatId = S.SeatId
            AND BD.BookingId = A.TripId
        WHERE C.LocationName = @FromLocation
          AND D.LocationName = @ToLocation
          AND BD.SeatId IS NULL
        GROUP BY
            A.TripId,
            A.Price,
            C.LocationName,
            D.LocationName,
            F.CompanyName,
            F.Description,
            E.LicensePlate;
    `);
    return result.recordset;
};

exports.GetTripById = async (tripId) => {
  const db = await pool;
    const result = await db.request()
    .input('tripId', sql.Int, tripId)
    .query(`
        Select T.TripId, R.RouteId, F.LocationName as [From], G.LocationName as [To]
        , T.DepartureTime, T.ArrivalTime, B.LicensePlate, BC.CompanyName
        from Trips T
        inner join Routes R on T.RouteId = R.RouteId
        inner join Locations F on R.FromLocationId = F.LocationId
        inner join Locations G on R.ToLocationId = G.LocationId
        inner join Buses B on T.BusId = B.BusId
        inner join BusCompanies BC on B.CompanyId = BC.CompanyId
        where T.TripId = @tripId
    `);
    return result.recordset[0];
}