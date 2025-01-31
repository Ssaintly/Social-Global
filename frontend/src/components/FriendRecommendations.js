import React, { useEffect, useState } from "react";
import friendService from "../api/friendService";
import { HiUserCircle } from "react-icons/hi";


const FriendRecommendations = () => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await friendService.getRecommendations();
        setRecommendations(data);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
      }
    };
    fetchRecommendations();
  }, []);

  const handleSendRequest = async (recipientId) => {
    try {
      await friendService.sendFriendRequest(recipientId);
      alert("Friend request sent!");
    } catch (error) {
      alert("Failed to send request. Maybe it was already sent.");
    }
  };

  return (
    <div className="card p-4">
      <h3 className="text-lg font-semibold mb-4">People You May Know</h3>
      <div className="space-y-3">
        {recommendations.map((user) => (
          <div key={user._id} className="flex items-center justify-between p-2 border-b">
            <div className="flex items-center gap-3">
              <HiUserCircle className="text-2xl text-gray-400" />
              <div>
                <p className="font-medium">{user.username}</p>
                <p className="text-sm text-gray-500">
                  {user.mutualCount > 0 && `${user.mutualCount} mutual friends`}
                  {user.commonInterestsCount > 0 && ` • ${user.commonInterestsCount} common interests`}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleSendRequest(user._id)}
              className="btn-primary text-sm px-3 py-1"
            >
              Add Friend
            </button>
          </div>
        ))}
        {recommendations.length === 0 && (
          <p className="text-gray-500">No recommendations found</p>
        )}
      </div>
    </div>
  );
};

export default FriendRecommendations;