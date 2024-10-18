import axios from 'axios';

// API base URL
const API_BASE_URL = 'https://amsha-gen-96609f863a46.herokuapp.com/api';

// Signup API
export const registerUser = async (userData: {
  fullName: string;
  phoneNumber: string;
  email: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/register`, userData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error registering user');
  }
};

// Login API
export const loginUser = async (credentials: { email: string; password: string }) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error logging in');
  }
};

// Example API for dashboard data (protected routes)
export const getDashboardData = async (token: string) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Error fetching dashboard data');
  }
};
