const pool = require("../config/db");
const sql = require("mssql");

exports.findByPhone = async (phone) => {
  const db = await pool;
  const result = await db.request()
    .input("phone", sql.NVarChar, phone)
    .query(`
      SELECT TOP 1 *
      FROM Users
      WHERE Phone = @phone
    `);

  return result.recordset[0];
};
