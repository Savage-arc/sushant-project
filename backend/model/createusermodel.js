const { DataTypes } = require('sequelize');
const {sequelize} = require('../database/db');

const User = sequelize.define("User", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false
  },
  role: {
      type: DataTypes.ENUM('admin', 'user'),
      defaultValue: 'user'
  },
  Image: {
      type: DataTypes.STRING,
      allowNull: true
  },
}, {
  tableName: "users",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: false,
});

module.exports = User;
