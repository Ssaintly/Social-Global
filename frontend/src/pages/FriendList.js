import React from "react";

const FriendList = ({ friends }) => {
  return (
    <div className="friend-list">
      <h3>Friends</h3>
      {friends.map((friend) => (
        <div key={friend._id} className="friend">
          <p>{friend.username}</p>
        </div>
      ))}
    </div>
  );
};

export default FriendList;