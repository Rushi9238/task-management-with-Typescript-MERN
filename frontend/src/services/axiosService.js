import axios from "axios";

// Create axios instance with base configuration
export const api = axios.create({
  baseURL: "http://localhost:3044/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Define public (no-auth) routes
const PUBLIC_ROUTES = ["/login", "/signup"];

// Request interceptor
api.interceptors.request.use(
  (config) => {
    const isPublic = PUBLIC_ROUTES.some((route) =>
      config.url.includes(route)
    );

    if (!isPublic) {
      const token = localStorage.getItem("taskmaster_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
    //   localStorage.removeItem("taskmaster_token");
    //   localStorage.removeItem("taskmaster_auth");
    //   window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
