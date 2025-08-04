const express = require('express');
const router = express.Router(); // ✅ Create a router instance
const { addUser } = require('../controller/createuser');

router.post('/createuser', addUser);
module.exports = router;

