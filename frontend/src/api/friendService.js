import axios from "axios";

const API_URL = "http://localhost:4000/api/friend";

const sendFriendRequest = async (recipientId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/request`,
    { recipientId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const acceptFriendRequest = async (requestId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/accept`,
    { requestId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const rejectFriendRequest = async (requestId) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(
    `${API_URL}/reject`,
    { requestId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
};

const getFriendRequests = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/requests`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getFriends = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/friends`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const getRecommendations = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/recommendations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const friendService = {
  sendFriendRequest,
  acceptFriendRequest,
  rejectFriendRequest,
  getFriendRequests,
  getFriends,
  getRecommendations,
};

export default friendService;