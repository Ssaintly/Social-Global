// controllers/friendController.js
const FriendRequest = require("../models/FriendRequest");
const User = require("../models/User");

// Send friend request
exports.sendFriendRequest = async (req, res) => {
  try {
    const { recipientId } = req.body;
    const senderId = req.user.id;

    // Check if request already exists
    const existingRequest = await FriendRequest.findOne({
      sender: senderId,
      recipient: recipientId,
    });
    if (existingRequest) {
      return res.status(400).json({ message: "Friend request already sent" });
    }

    // Create new friend request
    const friendRequest = await FriendRequest.create({
      sender: senderId,
      recipient: recipientId,
    });

    res.status(201).json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Accept friend request
exports.acceptFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Find and update the request
    const friendRequest = await FriendRequest.findByIdAndUpdate(
      requestId,
      { status: "accepted" },
      { new: true }
    );

    // Add friends to each other's friend list
    await User.findByIdAndUpdate(friendRequest.sender, {
      $push: { friends: friendRequest.recipient },
    });
    await User.findByIdAndUpdate(friendRequest.recipient, {
      $push: { friends: friendRequest.sender },
    });

    res.json(friendRequest);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Reject friend request
exports.rejectFriendRequest = async (req, res) => {
  try {
    const { requestId } = req.body;

    // Find and delete the request
    await FriendRequest.findByIdAndDelete(requestId);

    res.json({ message: "Friend request rejected" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get friend requests
exports.getFriendRequests = async (req, res) => {
  try {
    const userId = req.user.id;
    const requests = await FriendRequest.find({ recipient: userId, status: "pending" })
      .populate("sender", "username email");
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get friends list
exports.getFriends = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId).populate("friends", "username email");
    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Friend Recommendations
exports.getFriendRecommendations = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId);

    // 1. Mutual Friends Recommendations
    const mutualFriendsRecommendations = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId }, // Exclude self
          friends: { $in: user.friends }, // Friends of user's friends
          $nor: [{ _id: { $in: user.friends } }, { _id: userId }] // Exclude existing friends
        }
      },
      {
        $addFields: {
          mutualCount: {
            $size: { $setIntersection: ["$friends", user.friends] }
          }
        }
      },
      { $sort: { mutualCount: -1 } }, // Highest mutual friends first
      { $limit: 10 }, // Top 10 recommendations
      { $project: { password: 0 } } // Exclude sensitive data
    ]);

    // 2. Common Interests Recommendations (Optional)
    const commonInterestsRecommendations = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
          interests: { $in: user.interests || [] }, // Only if interests exist
          $nor: [{ _id: { $in: user.friends } }, { _id: userId }]
        }
      },
      {
        $addFields: {
          commonInterestsCount: {
            $size: { $setIntersection: ["$interests", user.interests || []] }
          }
        }
      },
      { $sort: { commonInterestsCount: -1 } },
      { $limit: 10 },
      { $project: { password: 0 } }
    ]);

    // Combine & deduplicate results
    const recommendations = [
      ...mutualFriendsRecommendations,
      ...commonInterestsRecommendations
    ].filter((v, i, a) => a.findIndex(t => t._id === v._id) === i);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};