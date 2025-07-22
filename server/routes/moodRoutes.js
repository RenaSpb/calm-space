const express = require('express');
const router = express.Router();
const pool = require('../db'); 


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


router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM moods ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (error) {
    console.error('Error fetching moods:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

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

module.exports = router;