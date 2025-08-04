const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const CompletedSession = sequelize.define('CompletedSession', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sessionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  completedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'completed_sessions',
  timestamps: false,
});

module.exports = CompletedSession;
