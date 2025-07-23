const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const ensureMoodsTable = async () => {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS moods (
        id SERIAL PRIMARY KEY,
        mood TEXT NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ 'moods' table is ready.");
  } catch (err) {
    console.error("❌ Error ensuring moods table:", err);
  }
};

ensureMoodsTable();

module.exports = pool;