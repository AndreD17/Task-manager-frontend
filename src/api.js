// src/api.js
import axios from "axios";

let API_BASE_URL = process.env.REACT_APP_API_URL;


if (API_BASE_URL && !API_BASE_URL.startsWith("http")) {
  API_BASE_URL = `http://${API_BASE_URL}`;
}

// Fallback for local dev
if (!API_BASE_URL) {
  API_BASE_URL = "http://localhost:5000";
}

export { API_BASE_URL };

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// Attach JWT
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  Promise.reject
);

// Global auth handling
api.interceptors.response.use(
  (res) => res,
  (err) => {
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
