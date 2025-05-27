const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Recommendation = sequelize.define('Recommendation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  mood: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('Quote', 'Advice', 'Exercise'),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'recommendations',  
  freezeTableName: true,       
  timestamps: false           
});

module.exports = Recommendation; 