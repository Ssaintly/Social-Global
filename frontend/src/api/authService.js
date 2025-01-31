import axios from "axios";

const API_URL = "http://localhost:4000/api/auth";

const register = async (userData) => {
  const response = await axios.post(`${API_URL}/register`, userData);
  return response.data;
};

const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  return response.data;
};

// Assign the object to a variable before exporting
const authService = { register, login };

export default authService;