
import pool from "@/lib/db";


export async function GET() {
  try {
    const result = await pool.query(`
      SELECT
        current_database() AS database,
        current_user AS connected_user,
        NOW() AS server_time
    `);

    return Response.json({
      success: true,
      message: "MONO connected to PostgreSQL successfully!",
      database: result.rows[0].database,
      user: result.rows[0].connected_user,
      serverTime: result.rows[0].server_time,
    });
  } catch (error) {
    console.error("PostgreSQL connection error:", error.message);

    return Response.json(
      {
        success: false,
        message: "Unable to connect to PostgreSQL."
      },
      { status: 500 }
    );
  }
}
