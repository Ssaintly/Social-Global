// routes/friendRoutes.js
const express = require("express");
const router = express.Router();
const friendController = require("../controllers/friendController");
const authMiddleware = require("../middleware/authMiddleware");

// Protected routes (require authentication)
router.post("/request", authMiddleware, friendController.sendFriendRequest);
router.post("/accept", authMiddleware, friendController.acceptFriendRequest);
router.post("/reject", authMiddleware, friendController.rejectFriendRequest);
router.get("/requests", authMiddleware, friendController.getFriendRequests);
router.get("/friends", authMiddleware, friendController.getFriends);
router.get("/recommendations", authMiddleware, friendController.getFriendRecommendations);

module.exports = router;