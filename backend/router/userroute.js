// const express = require('express');
// const { createuser } = require('../controller/usercontroller');


// express.post("/createuser",createuser);
// module.exports = express;



const express = require('express');
const router = express.Router(); // ✅ Create a router instance
const { createuser, getallusers, updateuser, deleteuser,getuserbyid,updateuserbyself } = require('../controller/usercontroller');
const authGuard = require('../middleware/authguard');
const isadmin = require('../middleware/isadmin');
const fileUpload = require('../middleware/multer');

router.post('/createusers', fileUpload("image") , createuser); // ✅ Use router, not express
router.get('/getallusers', authGuard,isadmin, getallusers); // ✅ Use router, not express
router.get('/getallusers-public', getallusers); // Public endpoint for testing
router.put('/updateuser/:id', fileUpload("image"), authGuard,isadmin,updateuser); // ✅ Use router, not express
router.delete('/deleteuser:id', authGuard, isadmin,deleteuser);
router.get('/getuserbyid/:id', authGuard,isadmin, getuserbyid); // ✅ Use router, not express
router.put('/updateuserbyself', authGuard,fileUpload("image"), updateuserbyself); // ✅ Use router, not express
module.exports = router;