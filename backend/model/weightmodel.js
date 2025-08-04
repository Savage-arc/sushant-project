const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const WeightSession = sequelize.define("WeightSession", {
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
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "weight_sessions",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

module.exports = WeightSession; 