const express = require("express");
const router = express.Router();
const { 
  getAllCardioSessions, 
  createCardioSession, 
  updateCardioSession, 
  deleteCardioSession 
} = require("../controller/cardiocontroller");
const authGuard = require("../middleware/authguard");
const isAdmin = require("../middleware/isadmin");

// Get all cardio sessions (public - no auth required)
router.get("/sessions", getAllCardioSessions);

// Create cardio session (admin only)
router.post("/sessions", authGuard, isAdmin, createCardioSession);

// Update cardio session (admin only)
router.put("/sessions/:id", authGuard, isAdmin, updateCardioSession);

// Delete cardio session (admin only)
router.delete("/sessions/:id", authGuard, isAdmin, deleteCardioSession);

module.exports = router;



// const express = require("express");
// const router = express.Router();
// const Cardio = require("../model/cardiomodel");

// router.get("/all", async (req, res) => {
//   try {
//     const sessions = await Cardio.findAll();
//     res.json({ success: true, sessions });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// // POST /api/cardio/add — create a cardio workout
// router.post("/add", async (req, res) => {
//    console.log("Request body:", req.body);
//   try {
//     const { workoutName, duration, caloriesBurned } = req.body;

//     const newCardio = await Cardio.create({
//       workoutName,
//       duration,
//       caloriesBurned,
//     });

//     res.json({ success: true, session: newCardio });
//   } catch (error) {
//     res.status(500).json({ success: false, message: error.message });
//   }
// });

// module.exports = router;


