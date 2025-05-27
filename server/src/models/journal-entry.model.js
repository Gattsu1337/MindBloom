const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = require('./user.model');

const JournalEntry = sequelize.define('JournalEntry', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  mood: {
    type: DataTypes.ENUM('Happy', 'Sad', 'Angry', 'Anxious', 'Excited', 'Neutral'),
    allowNull: false
  },
  note: {
    type: DataTypes.STRING(500),
    allowNull: true
  },
  trigger: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  entry_date: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  }
}, {
  tableName: 'journalentries',
  freezeTableName: true,
  timestamps: false
});

User.hasMany(JournalEntry, {
  foreignKey: 'user_id'
});
JournalEntry.belongsTo(User, {
  foreignKey: 'user_id'
});

module.exports = JournalEntry; 