import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export default function init({token}) {
  try {
    axios.defaults.baseURL = BASE_URL;
    axios.defaults.withCredentials = false;

    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      console.log("No Access Token found in cookies");
    }

    // Add a request interceptor to attach the Authorization header
    axios.interceptors.request.use((config) => {
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    // Add a response interceptor to handle 401 Unauthorized errors
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Handle session expiration, e.g., redirect to login page
          console.log("Session expired. Redirecting to login page...");
          window.location.href = "/login";
        }

        return Promise.reject(error);
      }
    );
  } catch (error) {
    console.error("Initialization error:", error);
  }
}
