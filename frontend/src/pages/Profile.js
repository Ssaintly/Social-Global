import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../api/userService";
import friendService from "../api/friendService";
import FriendRequest from "../components/FriendRequest";
import FriendList from "../components/FriendList";
import SearchUsers from "../components/SearchUsers"; // Import the new component
import { HiUserCircle, HiPencil } from "react-icons/hi";
import FriendRecommendations from "../components/FriendRecommendations";


const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profile = await userService.getProfile();
        setUsername(profile.username);
        setEmail(profile.email);

        const requests = await friendService.getFriendRequests();
        setFriendRequests(requests);

        const friendsList = await friendService.getFriends();
        setFriends(friendsList);
      } catch (error) {
        navigate("/login");
      }
    };
    fetchData();
  }, [navigate]);

  const handleAcceptRequest = async (requestId) => {
    await friendService.acceptFriendRequest(requestId);
    setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
    const updatedFriends = await friendService.getFriends();
    setFriends(updatedFriends);
  };

  const handleRejectRequest = async (requestId) => {
    await friendService.rejectFriendRequest(requestId);
    setFriendRequests(friendRequests.filter((req) => req._id !== requestId));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await userService.updateProfile({ username, email });
      alert("Profile updated successfully!");
      setIsEditing(false); // Exit edit mode
    } catch (error) {
      alert("Failed to update profile!");
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="card mb-6">
        <div className="flex items-center gap-4 mb-6">
          <HiUserCircle className="text-4xl text-gray-400" />
          <div>
            <h1 className="text-2xl font-bold">{username}</h1>
            <p className="text-gray-600">{email}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="ml-auto flex items-center gap-1 text-blue-600 hover:text-blue-700"
          >
            <HiPencil className="text-lg" />
            Edit Profile
          </button>
        </div>

        {isEditing && (
          <form onSubmit={handleUpdate} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </form>
        )}
      </div>

      {/* Add the SearchUsers component */}
      <SearchUsers />

      <div className="grid md:grid-cols-3 gap-6">
      <div className="card">
          <h3 className="text-lg font-semibold mb-4">Friend Requests</h3>
          {friendRequests.map((request) => (
            <FriendRequest
              key={request._id}
              request={request}
              onAccept={handleAcceptRequest}
              onReject={handleRejectRequest}
            />
          ))}
          {friendRequests.length === 0 && (
            <p className="text-gray-500">No Friends found.</p>
          )}
        </div>
        <div className="card">
          <FriendList friends={friends} />
        </div>
        <FriendRecommendations />
      </div>
    </div>
  );
};


export default Profile;