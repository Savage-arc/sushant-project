const {Sequelize} = require('sequelize');
require("dotenv").config();

// const isTestEnvironment  = process.env.NODE_ENV === 'test';
// console.log(`Running in ${isTestEnvironment ? 'test': 'development'} mode.`);


// const sequelize = new Sequelize('softwarica','root','root', {
//     host: process.env.DB_HOST,
//     dialect: "mysql",
//     logging: true,
// });
const sequelize = new Sequelize('jenish','root','root', {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
});


const connectDB = async () => {
    try{
        await sequelize.authenticate();
        console.log("dataabase connectes sucessfully");
    } catch (error) {
        
        console.error("Unable to connect to the database:", error);
    }




};

module.exports = { sequelize, connectDB };