// userController.js
const User = require("../models/User");

// Get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const { username, email } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { username, email },
      { new: true }
    ).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchUsers = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id; // Get the logged-in user's ID from the token

    // Search for users excluding the logged-in user
    const users = await User.find({
      $and: [
        {
          $or: [
            { username: { $regex: query, $options: "i" } }, // Case-insensitive search
            { email: { $regex: query, $options: "i" } },
          ],
        },
        { _id: { $ne: userId } }, // Exclude the logged-in user
      ],
    }).select("-password"); // Exclude passwords from the response

    res.json(users);
  } catch (error) {
    console.error("Search error:", error); // Log errors
    res.status(500).json({ message: "Server error" });
  }
};
