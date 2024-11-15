// utils/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

// Interceptor to check and refresh token on 401 responses
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post('/token/refresh/', {
          refresh: localStorage.getItem('refresh_token'),
        });

        // Save new access token
        localStorage.setItem('cars_token', refreshResponse.data.access);

        // Retry original request with new token
        error.config.headers['Authorization'] = `Bearer ${refreshResponse.data.access}`;
        return api.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        // Redirect to login or handle logout if refresh fails
        localStorage.removeItem('cars_token');
        localStorage.removeItem('refresh_token');
        window.location.href = '/';
      }
    }
    return Promise.reject(error);
  }
);

// Set access token on all requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cars_token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default api;