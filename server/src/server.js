const express = require('express');
const cors = require('cors');
const { sequelize } = require('./config/database');
const authRoutes = require('./routes/auth.routes');
const entriesRoutes = require('./routes/entries.routes');
const recommendationsRoutes = require('./routes/recommendations.routes');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/entries', entriesRoutes);
app.use('/recommendations', recommendationsRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established successfully.');
    
    await sequelize.sync();
    console.log('Database synchronized.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to start server:', error);
  }
}

startServer(); 