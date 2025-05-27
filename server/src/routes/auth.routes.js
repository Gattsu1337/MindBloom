const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const {Op} = require('sequelize');
const cors = require('cors');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

const app = express();

app.use(cors({
  origin: 'http://localhost:8080',  
  credentials: true
}));

router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }  
    });
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/register',
  [
    body('username').trim().isLength({ min: 1, max: 50 }),
    body('email').isEmail(),
    body('password').isLength({ min: 8 })
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { username, email, password } = req.body;

      const existingUser = await User.findOne({
        where: {
          [Op.or]: [
            { email },
            { username }
          ]
        }
      });

      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      const user = await User.create({
        username,
        email,
        password
      });

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'supersecret',
        { expiresIn: '1h' }
      );

      res.status(201).json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

router.post('/login',
  [
    body('identifier').trim().exists(),
    body('password').exists()
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { identifier, password } = req.body;

      const user = await User.findOne({
        where: {
          [Op.or]: [
            { email: identifier },
            { username: identifier }
          ]
        }
      });

      if (!user || !(await user.validatePassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET || 'supersecret',
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
);

module.exports = router; 