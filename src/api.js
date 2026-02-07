// src/api.js
import axios from "axios";

let API_BASE_URL = process.env.REACT_APP_API_URL;

if (API_BASE_URL && !API_BASE_URL.startsWith("http")) {
  API_BASE_URL = `http://${API_BASE_URL}`;
}


if (!API_BASE_URL) {
  API_BASE_URL = "http://localhost:5000";
}


API_BASE_URL = API_BASE_URL.replace(/\/$/, '');

export { API_BASE_URL };

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Request interceptor with debug logging
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔵 API Request:', {
        url: config.baseURL + config.url,
        method: config.method,
        data: config.data,
      });
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor with debug logging
api.interceptors.response.use(
  (res) => {
    // ✅ Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ API Response:', {
        url: res.config.url,
        status: res.status,
        data: res.data,
      });
    }
    return res;
  },
  (err) => {
    // ✅ Debug logging for development
    if (process.env.NODE_ENV === 'development') {
      console.error('❌ API Error:', {
        url: err.config?.url,
        status: err.response?.status,
        message: err.message,
        data: err.response?.data,
      });
    }
    
    if (err.response?.status === 401) {
      localStorage.removeItem("token");
      if (window.location.pathname !== "/login") {
        window.location.replace("/login");
      }
    }
    return Promise.reject(err);
  }
);

export default api;