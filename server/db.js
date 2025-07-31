const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,       
    rejectUnauthorized: false 
  }
});

async function ensureMoodsTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS moods (
        id SERIAL PRIMARY KEY,
        mood TEXT NOT NULL,
        note TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log("✅ Moods table ready");
  } catch (error) {
    console.error("❌ Error ensuring moods table:", error);
  }
}

ensureMoodsTable();

module.exports = pool;