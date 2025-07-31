const express = require('express');
const router = express.Router();
const pool = require('../db'); 

// Create Mood
router.post('/', async (req, res) => {
  const { mood, note } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  try {
    const query = `
      INSERT INTO moods (mood, note)
      VALUES ($1, $2)
      RETURNING *;
    `;
    const values = [mood, note || null];
    const result = await pool.query(query, values);
    res.status(201).json({ message: 'Mood saved!', mood: result.rows[0] });
  } catch (error) {
    console.error('Error saving mood:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Read Moods get all moods(+ optional filters: by date, by type)
router.get('/', async (req, res) => {
  const { startDate, endDate, type } = req.query;

  let query = `SELECT * FROM moods WHERE 1=1`;
  let params = [];
  let idx = 1;

  if (startDate) {
    query += ` AND created_at >= $${idx++}`;
    params.push(startDate);
  }
  if (endDate) {
    query += ` AND created_at <= $${idx++}`;
    params.push(endDate);
  }
  if (type) {
    query += ` AND mood = $${idx++}`;
    params.push(type);
  }

  query += ` ORDER BY created_at DESC`;

  try {
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete mood
router.delete('/:id', async (req, res) => {
  const moodId = req.params.id;

  try {
    const result = await pool.query('DELETE FROM moods WHERE id = $1 RETURNING *', [moodId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Mood not found' });
    }

    res.json({ message: 'Mood deleted', deleted: result.rows[0] });
  } catch (error) {
    console.error('Error deleting mood:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update Mood if user changed his mind
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { mood, note } = req.body;

  if (!mood) {
    return res.status(400).json({ error: 'Mood is required' });
  }

  try {
    const query = `
      UPDATE moods
      SET mood = $1, note = $2
      WHERE id = $3
      RETURNING *;
    `;
    const values = [mood, note || null, id];
    const result = await pool.query(query, values);

    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Mood not found' });
    }

    res.json({ message: 'Mood updated', mood: result.rows[0] });
  } catch (error) {
    console.error('Error updating mood:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Summary endpoint (weekly report/monthly report)
router.get('/summary', async (req, res) => {
  const { period = 'week' } = req.query;

  const groupBy =
    period === 'month'
      ? "TO_CHAR(created_at, 'YYYY-MM')"  // group by month
      : "TO_CHAR(created_at, 'IYYY-IW')"; // group by week

  try {
    const result = await pool.query(
      `
      SELECT ${groupBy} as period,
             AVG(
               CASE mood
                 WHEN 'Happy' THEN 5
                 WHEN 'Calm' THEN 4
                 WHEN 'Neutral' THEN 3
                 WHEN 'Tired' THEN 2
                 WHEN 'Sad' THEN 1
                 WHEN 'Anxious' THEN 0
               END
             ) as avg_mood
      FROM moods
      GROUP BY period
      ORDER BY period DESC;
      `
    );

    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching summary:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;