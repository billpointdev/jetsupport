import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  withCredentials: false,
});

// Request interceptor to attach token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem("access_token");
    if (userToken)  {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("Session expired. Redirecting to login page...");
      // Handle the session expiry case
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
