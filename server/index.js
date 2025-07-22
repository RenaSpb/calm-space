const express = require('express');
const cors = require('cors');
const pool = require('./db');
require('dotenv').config();

const chatRoutes = require('./routes/chatRoutes');
const moodRoutes = require('./routes/moodRoutes'); 

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);
app.use('/mood', moodRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});