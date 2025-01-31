import React from "react";
import { HiUserAdd, HiX } from "react-icons/hi";

const FriendRequest = ({ request, onAccept, onReject }) => {
  return (
    <div className="flex items-center justify-between p-4 border-b last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
          <HiUserAdd className="text-gray-500" />
        </div>
        <div>
          <p className="font-medium">{request.sender.username}</p>
          <p className="text-sm text-gray-500">{request.sender.email}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onAccept(request._id)}
          className="px-3 py-1 bg-green-100 text-green-700 rounded-lg hover:bg-green-200"
        >
          Accept
        </button>
        <button
          onClick={() => onReject(request._id)}
          className="px-3 py-1 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
        >
          <HiX className="inline-block" />
        </button>
      </div>
    </div>
  );
};

export default FriendRequest;