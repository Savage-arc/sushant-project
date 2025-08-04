// const { DataTypes } = require('sequelize');
// const {sequelize} = require('../database/db');

// const User = sequelize.define('user', 
// {
//     id: {
//         type: DataTypes.INTEGER,
//         autoIncrement: true,
//         primaryKey: true
//     },
//     username: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     address: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     email: {
//         type: DataTypes.STRING,
//         allowNull: false,
//         unique: true
//     },
//     password: {
//         type: DataTypes.STRING,
//         allowNull: false
//     },
//     createdAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     updatedAt: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },
//     role: {
//         type: DataTypes.ENUM('admin', 'user'),
//         defaultValue: 'user'
//     },
//     Image: {
//         type: DataTypes.STRING,
//         allowNull: true
//     }
// },{
//     timestamps: true,
//     tableName: 'users'  
// });


// //Define relationships if needed
// // For example, if you have other models like Post, you can define associations here

// // const user = require('./usermodel');
// // user.hasMany(User, { foreignKey: 'userId' });
// // Address.hasMany(User, { foreignKey: 'addressId' });
// // user.belongsTo(Address, { foreignKey: 'addressId' });


// module.exports = User;



// model/createusermodel.js

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');  // your Sequelize instance

const User = sequelize.define('User', {
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
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  role: {
        type: DataTypes.ENUM('admin', 'user'),
        defaultValue: 'user'
    }
}, {
  tableName: 'users',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: false,
});

module.exports = User;