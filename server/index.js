require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pool = require('./db');

const chatRoutes = require('./routes/chatRoutes');
//const moodRoutes = require('./routes/moodRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/chat', chatRoutes);  // 👉 сhat routes
//app.use('/mood', moodRoutes);  // 👉 mood routes

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.post("/mood", (req, res) => {
  const { mood, note } = req.body;
  console.log("Received mood entry:", { mood, note });

  // i will save to a db here:
  res.status(200).json({ message: "Mood saved!" });
});

app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ time: result.rows[0].now });
  } catch (error) {
    console.error("❌ Database connection error:", error);
    res.status(500).json({ error: "Database connection failed" });
  }
});
