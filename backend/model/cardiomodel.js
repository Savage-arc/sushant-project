const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Cardio = sequelize.define('Cardio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  createdBy: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'cardio_sessions',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = Cardio;
