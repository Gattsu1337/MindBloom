const express = require('express');
const { body, query, validationResult } = require('express-validator');
const auth = require('../middleware/auth.middleware');
const JournalEntry = require('../models/journal-entry.model');
const { Op } = require('sequelize');

const router = express.Router();

router.get('/',
  auth,
  [
    query('mood').optional().isIn(['Happy', 'Sad', 'Angry', 'Anxious', 'Excited', 'Neutral']),
    query('date').optional().isDate(),
    query('startDate').optional().isDate(),
    query('endDate').optional().isDate(),
    query('page').optional().isInt({ min: 1 }),
    query('pageSize').optional().isInt({ min: 1, max: 1000 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const page = parseInt(req.query.page) || 1;
      const pageSize = parseInt(req.query.pageSize) || 10;
      const offset = (page - 1) * pageSize;

      const where = {
        user_id: req.user.id
      };

      if (req.query.mood) {
        where.mood = req.query.mood;
      }

      if (req.query.date) {
        where.entry_date = req.query.date;
      } else if (req.query.startDate && req.query.endDate) {
        where.entry_date = {
          [Op.between]: [req.query.startDate, req.query.endDate]
        };
      }

      const entries = await JournalEntry.findAndCountAll({
        where,
        limit: pageSize,
        offset,
        order: [['entry_date', 'DESC']]
      });

      res.json({
        entries: entries.rows,
        total: entries.count,
        currentPage: page,
        totalPages: Math.ceil(entries.count / pageSize)
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.get('/:id', auth, async(req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });
    
    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }
    
    res.json(entry);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.post('/',
  auth,
  [
    body('mood').isIn(['Happy', 'Sad', 'Angry', 'Anxious', 'Excited', 'Neutral']),
    body('note').optional().isString().isLength({ max: 500 }),
    body('trigger').optional().isString().isLength({ max: 100 }),
    body('entry_date').isDate()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const entry = await JournalEntry.create({
        ...req.body,
        user_id: req.user.id
      });

      res.status(201).json(entry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.put('/:id', 
  auth, 
  [
    body('mood').optional().isIn(['Happy', 'Sad', 'Angry', 'Anxious', 'Excited', 'Neutral']),
    body('note').optional().isString().isLength({ max: 500 }),
    body('trigger').optional().isString().isLength({ max: 100 }),
    body('entry_date').optional().isDate()
  ],
  async (req, res) => {
    try {
      const entry = await JournalEntry.findOne({
        where: {
          id: req.params.id,
          user_id: req.user.id
        }
      });

      if (!entry) {
        return res.status(404).json({ message: 'Entry not found' });
      }

      const updatedEntry = await entry.update(req.body);
      res.json(updatedEntry);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.delete('/:id', auth, async (req, res) => {
  try {
    const entry = await JournalEntry.findOne({
      where: {
        id: req.params.id,
        user_id: req.user.id
      }
    });

    if (!entry) {
      return res.status(404).json({ message: 'Entry not found' });
    }

    await entry.destroy();
    res.json({ message: 'Journal entry deleted' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router; 