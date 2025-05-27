const express = require('express');
const { query, body, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const pool = require('../db');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const { mood, type } = req.query;
    const values = [];
    let queryText = 'SELECT * FROM recommendations';

    if(mood || type){
      const conditions = [];
      if(mood){
        conditions.push('mood = $1');
        values.push(mood);
      }
      if(type){
        conditions.push('type = $2');
        values.push(type);
      }
      
      queryText += ' WHERE ' + conditions.join(' AND ');
    }

    const { rows } = await pool.query(queryText, values);
    res.json(rows);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM recommendations WHERE id = $1', [req.params.id])
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', 
  auth,
  [
    body('mood').isString().notEmpty(),
    body('type').isIn(['Quote', 'Advice', 'Exercise']),
    body('content').isString().notEmpty()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { mood, type, content } = req.body;
      const { rows } = await pool.query('INSERT INTO recommendations (mood, type, content) VALUES ($1, $2, $3) RETURNING *', [mood, type, content]);

      res.status(201).json(rows[0]);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put('/:id', auth, [
  body('mood').optional().isString(),
  body('type').optional().isIn(['Quote', 'Advice', 'Exercise']),
  body('content').optional().isString()
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { rows: existingRows } = await pool.query("SELECT * FROM recommendations WHERE id = $1", [req.params.id]);
    if(existingRows.length === 0){
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    const { mood, type, content } = req.body;
    const updates = [];
    const values = [];
    let paramsCount = 1;

    if(mood){
      updates.push(`mood = $${paramsCount}`);
      values.push(mood);
      paramsCount++;
    }    
    if(type){
      updates.push(`type = $${paramsCount}`);
      values.push(type);
      paramsCount++;
    }
    if(content){
      updates.push(`content = $${paramsCount}`);
      values.push(content);
      paramsCount++;
    }
    
    if(updates.length === 0){
      return res.status(400).json({ message: 'No valid fields to update' });
    }

    values.push(req.params.id);
    const queryText = `UPDATE recommendations SET ${updates.join(', ')} WHERE id = $${paramsCount} RETURNING *`;
    const { rows: updatedRows } = await pool.query(queryText, values);

    res.json(updatedRows[0]);

} catch(error){
    res.status(400).json({ message: error.message });
}
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM recommendations WHERE id = $1", [req.params.id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: 'Recommendation not found' });
    }

    await pool.query("DELETE FROM recommendations WHERE id = $1", [req.params.id]);
    res.json({ message: 'Recommendation deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router; 