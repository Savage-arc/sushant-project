const express = require("express");
const cors = require('cors')
const { sequelize, connectDB } = require("./database/db.js");
require("dotenv").config();
const Cardio = require('./model/cardiomodel');
const Request = require('./model/requestmodel');
const WeightSession = require('./model/weightmodel');
const Yoga = require('./model/yogamodel'); // Added import
const app = express();
const port = process.env.PORT;

app.use(express.json());

app.use(cors({
  credentials: true,
  origin:['http://localhost:5173', 'http://localhost:5174']
}))


app.use("/api/users", require("../backend/router/userroute.js"));
app.use("/api/login", require("../backend/router/login.js"));
app.use("/api/cardio", require("../backend/router/cardioroute.js"));
app.use('/api/completed', require('./router/completedRoute'));
app.use("/uploads", express.static("uploads")); // Serve static files from the 'uploads' directory
app.use("/api/createuser", require("../backend/router/createuser.js"));
app.use("/api", require("./router/announcementroute.js"));
app.use("/api/requests", require("./router/requestroute.js"));
app.use("/api/weight", require("./router/weightroute.js"));
app.use("/api/yoga", require("./router/yogaroute.js")); // Added route

const startServer = async () => {
  try {
    await connectDB();
    await sequelize.sync({ alter: true }); // Sync the database schema with alter to add new tables
    console.log('Database synced successfully');
    app.listen(port, () => {
      console.log(` Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
  }
};

startServer();