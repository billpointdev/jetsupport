import axios from "axios";

const BASE_URL = import.meta.env.VITE_APP_BASE_URL;

export default function initAxios({ token }) {
  axios.defaults.baseURL = BASE_URL;
  axios.defaults.withCredentials = false;

  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    console.log("No Access Token found");
  }

  axios.interceptors.request.use((config) => {
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        console.log("Session expired. Redirecting to login page...");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );
}
