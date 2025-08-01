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

//Get all info
router.get('/', async (req, res) => {
  console.log("🛠 Received query params (ignored):", req.query); 

  const query = `SELECT * FROM moods ORDER BY created_at DESC`;

  try {
    const result = await pool.query(query);
    console.log("✅ Query executed:", query); 
    res.json(result.rows);
  } catch (error) {
    console.error('❌ Error fetching moods:', error);
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

module.exports = router;