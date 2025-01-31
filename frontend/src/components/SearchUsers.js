// components/SearchUsers.js
import React, { useState } from "react";
import userService from "../api/userService";
import friendService from "../api/friendService";

const SearchUsers = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);


const handleSearch = async () => {
    try {
      if (!query || query.trim() === "") {
        alert("Please enter a search term");
        return;
      }
      const users = await userService.searchUsers(encodeURIComponent(query)); // Encode special characters
      setResults(users);
    } catch (error) {
        console.log(error); 
      console.error("Search failed:", error);
    }
  };

  const handleSendRequest = async (recipientId) => {
    try {
      await friendService.sendFriendRequest(recipientId);
      alert("Friend request sent!");
    } catch (error) {
      alert("Failed to send request. Maybe it was already sent.");
    }
  };

  return (
    <div className="card mb-6">
      <h3 className="text-lg font-semibold mb-4">Search for Friends</h3>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by username or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        />
        <button onClick={handleSearch} className="btn-primary">
          Search
        </button>
      </div>

      <div className="space-y-2">
        {results.map((user) => (
          <div key={user._id} className="flex items-center justify-between p-2 border-b">
            <div>
              <p className="font-medium">{user.username}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <button
              onClick={() => handleSendRequest(user._id)}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
            >
              Add Friend
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchUsers;