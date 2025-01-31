import axios from "axios";

const API_URL = "http://localhost:4000/api/user";

const getProfile = async () => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

const updateProfile = async (userData) => {
  const token = localStorage.getItem("token");  
  try {
    const response = await axios.put(`${API_URL}/profile`, userData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating profile:", error.response || error);
    throw error;  // Re-throw the error to be handled higher up
  }
};

const searchUsers = async (query) => {
  const token = localStorage.getItem("token");
  const response = await axios.get(`${API_URL}/search`, {
    params: { query }, // Pass query as a URL parameter
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

// Assign the object to a variable before exporting
const userService = { getProfile, updateProfile, searchUsers };

export default userService;